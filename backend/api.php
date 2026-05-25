<?php
// ─── CORS ────────────────────────────────────────────────────────────────────
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

// ─── CONFIG ──────────────────────────────────────────────────────────────────
$config = require __DIR__ . '/config.php';
define('UPLOAD_DIR', __DIR__ . '/uploads/');
if (!is_dir(UPLOAD_DIR)) mkdir(UPLOAD_DIR, 0755, true);

// ─── JWT ─────────────────────────────────────────────────────────────────────
function b64u(string $d): string { return rtrim(strtr(base64_encode($d), '+/', '-_'), '='); }
function b64u_dec(string $d): string { return base64_decode(strtr($d, '-_', '+/')); }

function jwt_create(array $payload, string $secret): string {
    $h = b64u(json_encode(['alg'=>'HS256','typ'=>'JWT']));
    $p = b64u(json_encode($payload));
    return "$h.$p." . b64u(hash_hmac('sha256', "$h.$p", $secret, true));
}

function jwt_verify(string $token, string $secret): ?array {
    $parts = explode('.', $token);
    if (count($parts) !== 3) return null;
    [$h, $p, $s] = $parts;
    if (!hash_equals(b64u(hash_hmac('sha256', "$h.$p", $secret, true)), $s)) return null;
    $data = json_decode(b64u_dec($p), true);
    if (!$data || ($data['exp'] ?? 0) < time()) return null;
    return $data;
}

// ─── DB ──────────────────────────────────────────────────────────────────────
function db(array $c): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host={$c['db_host']};port={$c['db_port']};dbname={$c['db_name']};charset=utf8mb4";
        $pdo = new PDO($dsn, $c['db_user'], $c['db_pass'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
    return $pdo;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function respond($data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}
function abort(string $msg, int $code = 400): void { respond(['detail' => $msg], $code); }

function admin_emails(array $config): array {
    return array_column($config['admins'] ?? [], 'email');
}

function require_auth(array $config): string {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!preg_match('/^Bearer\s+(\S+)/i', $auth, $m)) abort('Unauthorized', 401);
    $p = jwt_verify($m[1], $config['jwt_secret']);
    if (!$p || !in_array($p['sub'], admin_emails($config), true)) abort('Unauthorized', 401);
    return $p['sub'];
}

function send_mail(array $config, string $subject, string $body): void {
    $to      = implode(', ', $config['contact_emails']);
    $headers = implode("\r\n", [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: Dux Domus sajt <noreply@duxdomus.rs>',
    ]);
    mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);
}

function new_uuid(): string {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0,0xffff), mt_rand(0,0xffff), mt_rand(0,0xffff),
        mt_rand(0,0x0fff)|0x4000, mt_rand(0,0x3fff)|0x8000,
        mt_rand(0,0xffff), mt_rand(0,0xffff), mt_rand(0,0xffff));
}

function row_to_post(array $r): array {
    return [
        'id'        => $r['id'],
        'title'     => $r['title'],
        'slug'      => $r['slug'],
        'excerpt'   => $r['excerpt'],
        'content'   => $r['content'],
        'category'  => $r['category'],
        'readTime'  => $r['read_time'],
        'image'     => $r['image'],
        'published' => (bool)$r['published'],
        'date'      => $r['date_str'],
        'created_at'=> $r['created_at'],
    ];
}

// ─── DB INIT & SEED ──────────────────────────────────────────────────────────
function init_db(array $config): void {
    $db = db($config);
    $db->exec("CREATE TABLE IF NOT EXISTS site_content (
        id VARCHAR(50) PRIMARY KEY,
        data LONGTEXT NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    $db->exec("CREATE TABLE IF NOT EXISTS blog_posts (
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        slug VARCHAR(500) NOT NULL UNIQUE,
        excerpt TEXT,
        content LONGTEXT,
        category VARCHAR(200),
        read_time VARCHAR(50) DEFAULT '5 min',
        image VARCHAR(1000) DEFAULT '',
        published TINYINT(1) DEFAULT 1,
        date_str VARCHAR(100),
        created_at VARCHAR(100)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

    if (!$db->query("SELECT id FROM site_content WHERE id='main'")->fetch()) {
        $stmt = $db->prepare("INSERT INTO site_content (id, data) VALUES ('main', ?)");
        $stmt->execute([json_encode(default_content(), JSON_UNESCAPED_UNICODE)]);
    }

    if ((int)$db->query("SELECT COUNT(*) as c FROM blog_posts")->fetch()['c'] === 0) {
        $stmt = $db->prepare("INSERT INTO blog_posts
            (id,title,slug,excerpt,content,category,read_time,image,published,date_str,created_at)
            VALUES (?,?,?,?,?,?,?,?,1,?,?)");
        foreach (default_posts() as $p) {
            $stmt->execute([$p['id'],$p['title'],$p['slug'],$p['excerpt'],$p['content'],
                $p['category'],$p['readTime'],$p['image'],$p['date'],$p['created_at']]);
        }
    }
}

// ─── DEFAULT CONTENT ─────────────────────────────────────────────────────────
function default_content(): array {
    return [
        'company_info' => [
            'name'    => 'Dux Domus',
            'owner'   => 'Slobodan Jakovljević',
            'pib'     => '107449273',
            'maticniBroj' => '62750367',
            'address' => 'Gornjomatejevačka 98 A, lokal B, 18000 Niš',
            'phones'  => [
                'slobodan'        => '064/23-505-27',
                'aleksa'          => '065/8430028',
                'kancelarija'     => '018/4558-625',
                'kancelarijaNote' => '(9-15h)',
            ],
            'email'   => 'duxdomus@yahoo.com',
            'founded' => '24.02.2012.',
            'mapEmbedUrl' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.0!2d21.9184554!3d43.3381998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4755b164c484bfdb%3A0x3d9e3db5b39a7c79!2sGornjomatejevacka%2098a%2C%20Nis!5e0!3m2!1sen!2srs!4v1680000000000!5m2!1sen!2srs',
        ],
        'hero_slides' => [
            ['id'=>1,'image'=>'https://images.unsplash.com/photo-1612637968894-660373e23b03?w=1920&q=80','title'=>'Profesionalni upravnik stambenih zgrada','subtitle'=>'u Nišu — 350 stambenih jedinica'],
            ['id'=>2,'image'=>'https://images.unsplash.com/photo-1594484208280-efa00f96fc21?w=1920&q=80','title'=>'Briga o Vašoj zgradi','subtitle'=>'Pouzdano i profesionalno upravljanje od 2012.'],
            ['id'=>3,'image'=>'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1920&q=80','title'=>'Transparentnost i efikasnost','subtitle'=>'Jasni troškovi — bez skrivenih naknada'],
        ],
        'about_text'  => 'Mi smo agencija koja će dati sve od sebe da Vaš standard života u zgradi digne na viši nivo. Agencija za upravljanje nekretninama DUX DOMUS Niš je osnovana 24.02.2012. godine.',
        'about_image' => 'https://images.unsplash.com/photo-1594484208280-efa00f96fc21?w=600&q=80',
        'mission'     => 'Agencija "Dux domus" će ostvariti svoju viziju ostvarivanjem koristi za korisnike naših usluga - olakšavanjem zajedničkog života u stambenim zgradama, kvalitetnim i odgovornim posredovanjem između stanara i svih spoljnih subjekata neophodnih za funkcionisanje zgrade.',
        'vision'      => 'Naša agencija će postavljati nove standarde kvaliteta, usluga i odgovornosti prema stanarima!',
        'pricing'     => [
            'minPrice' => 350,
            'currency' => 'RSD',
            'unit'     => 'posebnom delu',
            'note'     => 'Konačna cena formira se na osnovu ukupnog broja posebnih delova u Vašoj zgradi.',
        ],
        'stats' => [
            ['value'=>350,'label'=>'Stambenih jedinica','suffix'=>'+'],
            ['value'=>14, 'label'=>'Godina iskustva',   'suffix'=>'+'],
            ['value'=>9,  'label'=>'Saradnika',          'suffix'=>''],
            ['value'=>24, 'label'=>'Sata dostupnosti',   'suffix'=>'/7'],
        ],
        'manager_duties' => [
            'Rukovodi radom stambene zajednice',
            'Izvršava odluke Skupštine stambene zajednice',
            'Predlaže godišnji program održavanja zgrade',
            'Zaključuje Ugovore u ime zgrade i u svoje ime',
            'Izmiruje obaveze plaćanja u ime i za račun zgrade',
            'Saziva redovne skupštine stanara',
            'Redovno izveštava stanare putem obaveštenja na oglasnim tablama',
            'Vodi knjigovodstvo i podnosi finansijske izveštaje',
        ],
        'faqs' => [
            ['id'=>1,'question'=>'Šta je profesionalni upravnik stambene zajednice?','answer'=>'Profesionalni upravnik je fizičko ili pravno lice koje zakonom ovlašćuje skupština stambene zajednice da u njeno ime obavlja sve poslove upravljanja zgradom.'],
            ['id'=>2,'question'=>'Koje su prednosti angažovanja profesionalnog upravnika?','answer'=>'Prednosti su brojne: stručno upravljanje finansijama zgrade, povoljniji ugovori sa servisnim firmama, rešavanje problema 24/7, zakonska usklađenost i transparentno izveštavanje.'],
            ['id'=>3,'question'=>'Koliko često se obilazi zgrada?','answer'=>'Zgrade o kojima mi brinemo obilazimo redovno dva puta nedeljno i na licu mesta rešavamo sve uočene probleme.'],
            ['id'=>4,'question'=>'Da li pružate usluge van Niša?','answer'=>'Dux domus agencija obavlja uslugu naplate zajedničkih troškova skupštinama zgrada u svim gradovima Republike Srbije.'],
            ['id'=>5,'question'=>'Kako se rešavaju hitni problemi?','answer'=>'U našim zgradama stanari rešavaju sve probleme pozivom na jedan telefonski broj koji je non-stop aktivan.'],
        ],
        'services' => [
            ['id'=>1,'icon'=>'FileText','title'=>'Administrativno-tehnički poslovi','description'=>'Registracija stambene zgrade, pribavljanje matičnog broja i PIB-a, otvaranje tekućeg računa stambene zajednice.','details'=>['Registracija stambene zgrade u okviru lokalne samouprave','Pribavljanje matičnog broja','Pribavljanje PIB-a iz poreske uprave','Otvaranje tekućeg računa stambene zajednice']],
            ['id'=>2,'icon'=>'Scale','title'=>'Zakonske obaveze','description'=>'Zaključivanje svih potrebnih ugovora za tehničko održavanje, hitne intervencije i tekuće servisiranje.','details'=>['Zaključivanje ugovora za redovno tehničko održavanje zgrade','Zaključivanje ugovora za hitne intervencije','Zaključivanje ugovora za redovno održavanje lifta']],
            ['id'=>3,'icon'=>'Building2','title'=>'Organizacija poslova u zgradi','description'=>'Profesionalna organizacija svih tekućih i investicionih radova u stambenoj zgradi.','details'=>['Popisivanje i utvrđivanje broja članova domaćinstva','Pribavljanje ponuda i organizacija investicionih radova']],
            ['id'=>4,'icon'=>'CreditCard','title'=>'Naplata zajedničkih troškova','description'=>'Vršimo naplatu zajedničkih troškova za stambene zgrade u svim gradovima Republike Srbije.','details'=>['Naplata kroz JKP Objedinjena naplata','Naplata preko tekućeg računa stambene zajednice']],
            ['id'=>5,'icon'=>'Phone','title'=>'Non-stop dostupnost','description'=>'Stanari rešavaju sve probleme pozivom na jedan telefonski broj koji je non-stop aktivan.','details'=>['Jedan broj telefona uvek dostupan','Redovni obilasci zgrade dva puta nedeljno']],
            ['id'=>6,'icon'=>'BarChart3','title'=>'Finansijsko izveštavanje','description'=>'Redovno podnošenje finansijskih izveštaja stanarima putem blagajničkog izveštaja i bankovnih izvoda.','details'=>['Mesečni blagajnički izveštaji','Izvodi iz banke sa finansijskim stanjem']],
        ],
    ];
}

function default_posts(): array {
    $now = date('Y-m-d\TH:i:s');
    return [
        [
            'id' => new_uuid(), 'title' => 'Prava i obaveze stanara stambene zajednice',
            'slug' => 'prava-i-obaveze-stanara',
            'excerpt' => 'Svaki stanar ima zakonska prava, ali i obaveze prema stambenoj zajednici. Saznajte šta to podrazumeva u praksi.',
            'date' => '15. maj 2025.', 'category' => 'Zakon i propisi', 'readTime' => '5 min',
            'image' => 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
            'content' => "Zakon o stanovanju i održavanju zgrada definiše prava i obaveze svakog stanara koji je član stambene zajednice.\n\n**Osnovna prava stanara:**\n- Pravo glasa na skupštini stambene zajednice\n- Pravo uvida u finansijsko stanje zgrade\n- Pravo na informisanost o svim radovima i troškovima\n\n**Osnovne obaveze stanara:**\n- Redovno plaćanje zajedničkih troškova\n- Učešće u skupštinama i donošenju odluka\n- Poštovanje kućnog reda",
            'created_at' => $now,
        ],
        [
            'id' => new_uuid(), 'title' => 'Zašto je profesionalni upravnik bolje rešenje od komšije-predsednika?',
            'slug' => 'zasto-profesionalni-upravnik',
            'excerpt' => 'Komšija koji zna sve vs. stručno lice koje odgovara zakonom. Koja je razlika i zašto je važna?',
            'date' => '28. april 2025.', 'category' => 'Upravljanje zgradama', 'readTime' => '7 min',
            'image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
            'content' => "Mnoge zgrade i danas funkcionišu sa predsednikom skupštine koji je komšija volonter.\n\n**Šta donosi profesionalni upravnik:**\n- Zakonska odgovornost\n- Povoljniji ugovori sa servisnim firmama\n- Transparentno finansijsko izveštavanje\n- Dostupnost 24/7 za hitne slučajeve",
            'created_at' => $now,
        ],
        [
            'id' => new_uuid(), 'title' => 'Kako funkcionišu finansije stambene zajednice',
            'slug' => 'finansije-stambene-zajednice',
            'excerpt' => 'Ko skuplja novac, ko ima pravo uvida, kako se donose odluke o trošenju.',
            'date' => '5. mart 2025.', 'category' => 'Finansije', 'readTime' => '6 min',
            'image' => 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
            'content' => "Finansije stambene zajednice moraju biti transparentne i dostupne svakom stanaru.\n\n**Tekući račun stambene zajednice**\nSav novac ide na zvanični tekući račun.\n\n**Ko odlučuje o trošenju?**\nSkupština stanara odlučuje o svim radovima čija vrednost prelazi određeni prag.",
            'created_at' => $now,
        ],
    ];
}

// ─── ROUTING ─────────────────────────────────────────────────────────────────
$method   = $_SERVER['REQUEST_METHOD'];
$path     = trim($_GET['path'] ?? '', '/');
$segments = $path !== '' ? explode('/', $path) : [];

$body = [];
if (in_array($method, ['POST', 'PUT', 'PATCH'])) {
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
}

try {
    init_db($config);
} catch (Exception $e) {
    abort('Database connection failed: ' . $e->getMessage(), 500);
}

// GET /api/
if ($method === 'GET' && $path === '') {
    respond(['message' => 'Dux Domus CMS API']);
}

// POST /api/auth/login
if ($method === 'POST' && $path === 'auth/login') {
    $email    = $body['email'] ?? '';
    $password = $body['password'] ?? '';
    $matched  = null;
    foreach ($config['admins'] ?? [] as $admin) {
        if ($admin['email'] === $email && password_verify($password, $admin['password_hash'])) {
            $matched = $email;
            break;
        }
    }
    if (!$matched) abort('Pogrešan email ili lozinka', 401);
    $token = jwt_create(['sub' => $matched, 'exp' => time() + 48 * 3600], $config['jwt_secret']);
    respond(['access_token' => $token, 'token_type' => 'bearer']);
}

// POST /api/contact
if ($method === 'POST' && $path === 'contact') {
    $name    = htmlspecialchars(trim($body['name']    ?? ''), ENT_QUOTES);
    $email   = htmlspecialchars(trim($body['email']   ?? ''), ENT_QUOTES);
    $message = htmlspecialchars(trim($body['message'] ?? ''), ENT_QUOTES);
    if (!$name || !$email || !$message) abort('Sva polja su obavezna');
    $html = "<h2>Nova poruka sa kontakt forme</h2>
<p><strong>Ime:</strong> {$name}</p>
<p><strong>Email:</strong> {$email}</p>
<p><strong>Poruka:</strong></p><p>" . nl2br($message) . "</p>";
    send_mail($config, 'Kontakt forma — duxdomus.rs', $html);
    respond(['success' => true]);
}

// POST /api/quote
if ($method === 'POST' && $path === 'quote') {
    $address  = htmlspecialchars(trim($body['address']  ?? ''), ENT_QUOTES);
    $numUnits = htmlspecialchars(trim($body['numUnits'] ?? ''), ENT_QUOTES);
    $numOther = htmlspecialchars(trim($body['numOther'] ?? ''), ENT_QUOTES);
    $problem  = htmlspecialchars(trim($body['problem']  ?? ''), ENT_QUOTES);
    $email    = htmlspecialchars(trim($body['email']    ?? ''), ENT_QUOTES);
    if (!$address || !$numUnits || !$email) abort('Adresa, broj stanova i email su obavezni');
    $html = "<h2>Zahtev za ponudu — duxdomus.rs</h2>
<p><strong>Adresa zgrade:</strong> {$address}</p>
<p><strong>Broj stanova:</strong> {$numUnits}</p>
<p><strong>Ostali prostori:</strong> {$numOther}</p>
<p><strong>Problem/napomena:</strong> {$problem}</p>
<p><strong>Email pošiljaoca:</strong> {$email}</p>";
    send_mail($config, 'Zahtev za ponudu — duxdomus.rs', $html);
    respond(['success' => true]);
}

// POST /api/referral
if ($method === 'POST' && $path === 'referral') {
    $name    = htmlspecialchars(trim($body['name']            ?? ''), ENT_QUOTES);
    $phone   = htmlspecialchars(trim($body['phone']           ?? ''), ENT_QUOTES);
    $address = htmlspecialchars(trim($body['buildingAddress'] ?? ''), ENT_QUOTES);
    $units   = htmlspecialchars(trim($body['numUnits']        ?? ''), ENT_QUOTES);
    $message = htmlspecialchars(trim($body['message']         ?? ''), ENT_QUOTES);
    if (!$name || !$phone || !$address) abort('Ime, telefon i adresa su obavezni');
    $html = "<h2>Nova preporuka — duxdomus.rs</h2>
<p><strong>Ime:</strong> {$name}</p>
<p><strong>Telefon:</strong> {$phone}</p>
<p><strong>Adresa zgrade:</strong> {$address}</p>
<p><strong>Broj stanova:</strong> {$units}</p>
<p><strong>Napomena:</strong> {$message}</p>";
    send_mail($config, 'Nova preporuka — duxdomus.rs', $html);
    respond(['success' => true]);
}

// GET /api/auth/verify
if ($method === 'GET' && $path === 'auth/verify') {
    $email = require_auth($config);
    respond(['valid' => true, 'email' => $email]);
}

// GET /api/content
if ($method === 'GET' && $path === 'content') {
    $row = db($config)->query("SELECT data FROM site_content WHERE id='main'")->fetch();
    respond($row ? json_decode($row['data'], true) : default_content());
}

// PUT /api/content
if ($method === 'PUT' && $path === 'content') {
    require_auth($config);
    unset($body['_id']);
    $json = json_encode($body, JSON_UNESCAPED_UNICODE);
    $stmt = db($config)->prepare("INSERT INTO site_content (id,data) VALUES ('main',?) ON DUPLICATE KEY UPDATE data=?");
    $stmt->execute([$json, $json]);
    respond(['success' => true]);
}

// GET /api/blog
if ($method === 'GET' && $path === 'blog') {
    $pub = ($_GET['published_only'] ?? 'true') !== 'false';
    $sql = "SELECT id,title,slug,excerpt,content,category,read_time,image,published,date_str,created_at FROM blog_posts"
         . ($pub ? " WHERE published=1" : "")
         . " ORDER BY created_at DESC LIMIT 100";
    $rows = db($config)->query($sql)->fetchAll();
    respond(array_map('row_to_post', $rows));
}

// GET /api/blog/{id_or_slug}
if ($method === 'GET' && count($segments) === 2 && $segments[0] === 'blog') {
    $val  = $segments[1];
    $stmt = db($config)->prepare("SELECT id,title,slug,excerpt,content,category,read_time,image,published,date_str,created_at FROM blog_posts WHERE id=? OR slug=? LIMIT 1");
    $stmt->execute([$val, $val]);
    $row  = $stmt->fetch();
    if (!$row) abort('Post not found', 404);
    respond(row_to_post($row));
}

// POST /api/blog
if ($method === 'POST' && $path === 'blog') {
    require_auth($config);
    $months = ['januar','februar','mart','april','maj','jun','jul','avgust','septembar','oktobar','novembar','decembar'];
    $now    = new DateTime();
    $id     = new_uuid();
    $date   = $now->format('j') . '. ' . $months[(int)$now->format('n') - 1] . ' ' . $now->format('Y') . '.';
    $cat    = date('Y-m-d\TH:i:s');
    try {
        $stmt = db($config)->prepare("INSERT INTO blog_posts (id,title,slug,excerpt,content,category,read_time,image,published,date_str,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)");
        $stmt->execute([$id, $body['title'], $body['slug'], $body['excerpt'] ?? '',
            $body['content'] ?? '', $body['category'] ?? '', $body['read_time'] ?? '5 min',
            $body['image'] ?? '', $body['published'] ? 1 : 0, $date, $cat]);
    } catch (PDOException $e) {
        if (str_contains($e->getMessage(), 'Duplicate')) abort('Slug već postoji', 400);
        throw $e;
    }
    respond(['id'=>$id,'title'=>$body['title'],'slug'=>$body['slug'],'excerpt'=>$body['excerpt']??'',
        'content'=>$body['content']??'','category'=>$body['category']??'','readTime'=>$body['read_time']??'5 min',
        'image'=>$body['image']??'','published'=>(bool)($body['published']??true),'date'=>$date,'created_at'=>$cat]);
}

// PUT /api/blog/{id}
if ($method === 'PUT' && count($segments) === 2 && $segments[0] === 'blog') {
    require_auth($config);
    $id      = $segments[1];
    $map     = ['title'=>'title','slug'=>'slug','excerpt'=>'excerpt','content'=>'content',
                'category'=>'category','read_time'=>'read_time','image'=>'image','published'=>'published'];
    $fields  = [];
    $values  = [];
    foreach ($map as $key => $col) {
        if (array_key_exists($key, $body)) {
            $fields[] = "$col=?";
            $values[] = $key === 'published' ? ($body[$key] ? 1 : 0) : $body[$key];
        }
    }
    if (!$fields) abort('Nema podataka za ažuriranje');
    $values[] = $id;
    $stmt = db($config)->prepare("UPDATE blog_posts SET " . implode(',', $fields) . " WHERE id=?");
    $stmt->execute($values);
    if ($stmt->rowCount() === 0) abort('Post not found', 404);
    $row = db($config)->prepare("SELECT id,title,slug,excerpt,content,category,read_time,image,published,date_str,created_at FROM blog_posts WHERE id=?");
    $row->execute([$id]);
    respond(row_to_post($row->fetch()));
}

// DELETE /api/blog/{id}
if ($method === 'DELETE' && count($segments) === 2 && $segments[0] === 'blog') {
    require_auth($config);
    $stmt = db($config)->prepare("DELETE FROM blog_posts WHERE id=?");
    $stmt->execute([$segments[1]]);
    if ($stmt->rowCount() === 0) abort('Post not found', 404);
    respond(['success' => true]);
}

// POST /api/upload
if ($method === 'POST' && $path === 'upload') {
    require_auth($config);
    if (empty($_FILES['file'])) abort('Fajl nije priložen');
    $file    = $_FILES['file'];
    $ext     = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowed = ['jpg','jpeg','png','gif','webp','svg'];
    if (!in_array($ext, $allowed)) abort('Nije dozvoljen ovaj format fajla');
    if ($file['size'] > 5 * 1024 * 1024) abort('Fajl je prevelik (max 5MB)');
    $filename = new_uuid() . '.' . $ext;
    move_uploaded_file($file['tmp_name'], UPLOAD_DIR . $filename);
    respond(['filename' => $filename, 'url' => '/zscms/api/files/' . $filename]);
}

// GET /api/files/{filename}
if ($method === 'GET' && count($segments) === 2 && $segments[0] === 'files') {
    $filename = basename($segments[1]); // basename prevents path traversal
    $filepath = UPLOAD_DIR . $filename;
    if (!file_exists($filepath)) abort('File not found', 404);
    $mime = mime_content_type($filepath);
    header('Content-Type: ' . $mime);
    header('Content-Length: ' . filesize($filepath));
    readfile($filepath);
    exit;
}

abort('Not found', 404);
