from fastapi import FastAPI, APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import FileResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from jose import JWTError, jwt
from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict
from datetime import datetime, timedelta
from pathlib import Path
from dotenv import load_dotenv
import os, uuid, logging, shutil

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# Auth config
SECRET_KEY = os.environ.get("JWT_SECRET", "fallback-secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 48
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@duxdomus.rs")
ADMIN_PASSWORD_HASH = os.environ.get("ADMIN_PASSWORD_HASH", "")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Upload directory
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Dux Domus CMS API")
api_router = APIRouter(prefix="/api")

# ─── Pydantic Models ────────────────────────────────────────

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    category: str
    read_time: str = "5 min"
    image: str = ""
    published: bool = True

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    read_time: Optional[str] = None
    image: Optional[str] = None
    published: Optional[bool] = None

# ─── Auth helpers ───────────────────────────────────────────

def verify_password(plain: str, hashed: str) -> bool:
    try:
        return pwd_context.verify(plain, hashed)
    except Exception:
        return False

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email != ADMIN_EMAIL:
            raise HTTPException(status_code=401, detail="Unauthorized")
        return email
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ─── Default site content (mirrors mock.js) ─────────────────

DEFAULT_CONTENT = {
    "_id": "main",
    "company_info": {
        "name": "Dux Domus",
        "owner": "Slobodan Jakovljević",
        "pib": "107449273",
        "maticniBroj": "62750367",
        "address": "Gornjomatejevačka 98 A, lokal B, 18000 Niš",
        "phones": {
            "slobodan": "064/23-505-27",
            "aleksa": "065/8430028",
            "kancelarija": "018/4558-625",
            "kancelarijaNote": "(9-15h)"
        },
        "email": "duxdomus@gmail.com",
        "founded": "24.02.2012.",
        "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.0!2d21.9184554!3d43.3381998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4755b164c484bfdb%3A0x3d9e3db5b39a7c79!2sGornjomatejevacka%2098a%2C%20Nis!5e0!3m2!1sen!2srs!4v1680000000000!5m2!1sen!2srs"
    },
    "hero_slides": [
        {"id": 1, "image": "https://images.unsplash.com/photo-1612637968894-660373e23b03?w=1920&q=80", "title": "Profesionalni upravnik stambenih zgrada", "subtitle": "u Nišu — 350 stambenih jedinica"},
        {"id": 2, "image": "https://images.unsplash.com/photo-1594484208280-efa00f96fc21?w=1920&q=80", "title": "Briga o Vašoj zgradi", "subtitle": "Pouzdano i profesionalno upravljanje od 2012."},
        {"id": 3, "image": "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1920&q=80", "title": "Transparentnost i efikasnost", "subtitle": "Jasni troškovi — bez skrivenih naknada"}
    ],
    "about_text": "Mi smo agencija koja će dati sve od sebe da Vaš standard života u zgradi digne na viši nivo. Agencija za upravljanje nekretninama DUX DOMUS Niš je osnovana 24.02.2012. godine.",
    "about_image": "https://images.unsplash.com/photo-1594484208280-efa00f96fc21?w=600&q=80",
    "mission": "Agencija \"Dux domus\" će ostvariti svoju viziju ostvarivanjem koristi za korisnike naših usluga - olakšavanjem zajedničkog života u stambenim zgradama, kvalitetnim i odgovornim posredovanjem između stanara i svih spoljnih subjekata neophodnih za funkcionisanje zgrade.",
    "vision": "Naša agencija će postavljati nove standarde kvaliteta, usluga i odgovornosti prema stanarima!",
    "pricing": {
        "minPrice": 350,
        "currency": "RSD",
        "unit": "posebnom delu",
        "note": "Konačna cena zavisi od ukupnog broja posebnih delova u zgradi."
    },
    "stats": [
        {"value": 350, "label": "Stambenih jedinica", "suffix": "+"},
        {"value": 13, "label": "Godina iskustva", "suffix": "+"},
        {"value": 9, "label": "Saradnika", "suffix": ""},
        {"value": 24, "label": "Sata dostupnosti", "suffix": "/7"}
    ],
    "manager_duties": [
        "Rukovodi radom stambene zajednice",
        "Izvršava odluke Skupštine stambene zajednice",
        "Predlaže godišnji program održavanja zgrade",
        "Zaključuje Ugovore u ime zgrade i u svoje ime",
        "Izmiruje obaveze plaćanja u ime i za račun zgrade",
        "Saziva redovne skupštine stanara",
        "Redovno izveštava stanare putem obaveštenja na oglasnim tablama",
        "Vodi knjigovodstvo i podnosi finansijske izveštaje"
    ],
    "faqs": [
        {"id": 1, "question": "Šta je profesionalni upravnik stambene zajednice?", "answer": "Profesionalni upravnik je fizičko ili pravno lice koje zakonom ovlašćuje skupština stambene zajednice da u njeno ime obavlja sve poslove upravljanja zgradom."},
        {"id": 2, "question": "Koje su prednosti angažovanja profesionalnog upravnika?", "answer": "Prednosti su brojne: stručno upravljanje finansijama zgrade, povoljniji ugovori sa servisnim firmama, rešavanje problema 24/7, zakonska usklađenost i transparentno izveštavanje."},
        {"id": 3, "question": "Koliko često se obilazi zgrada?", "answer": "Zgrade o kojima mi brinemo obilazimo redovno dva puta nedeljno i na licu mesta rešavamo sve uočene probleme."},
        {"id": 4, "question": "Da li pružate usluge van Niša?", "answer": "Dux domus agencija obavlja uslugu naplate zajedničkih troškova skupštinama zgrada u svim gradovima Republike Srbije."},
        {"id": 5, "question": "Kako se rešavaju hitni problemi?", "answer": "U našim zgradama stanari rešavaju sve probleme pozivom na jedan telefonski broj koji je non-stop aktivan."}
    ],
    "services": [
        {"id": 1, "icon": "FileText", "title": "Administrativno-tehnički poslovi", "description": "Registracija stambene zgrade, pribavljanje matičnog broja i PIB-a, otvaranje tekućeg računa stambene zajednice.", "details": ["Registracija stambene zgrade u okviru lokalne samouprave", "Pribavljanje matičnog broja", "Pribavljanje PIB-a iz poreske uprave", "Otvaranje tekućeg računa stambene zajednice"]},
        {"id": 2, "icon": "Scale", "title": "Zakonske obaveze", "description": "Zaključivanje svih potrebnih ugovora za tehničko održavanje, hitne intervencije i tekuće servisiranje.", "details": ["Zaključivanje ugovora za redovno tehničko održavanje zgrade", "Zaključivanje ugovora za hitne intervencije", "Zaključivanje ugovora za redovno održavanje lifta"]},
        {"id": 3, "icon": "Building2", "title": "Organizacija poslova u zgradi", "description": "Profesionalna organizacija svih tekućih i investicionih radova u stambenoj zgradi.", "details": ["Popisivanje i utvrđivanje broja članova domaćinstva", "Pribavljanje ponuda i organizacija investicionih radova"]},
        {"id": 4, "icon": "CreditCard", "title": "Naplata zajedničkih troškova", "description": "Vršimo naplatu zajedničkih troškova za stambene zgrade u svim gradovima Republike Srbije.", "details": ["Naplata kroz JKP Objedinjena naplata", "Naplata preko tekućeg računa stambene zajednice"]},
        {"id": 5, "icon": "Phone", "title": "Non-stop dostupnost", "description": "Stanari rešavaju sve probleme pozivom na jedan telefonski broj koji je non-stop aktivan.", "details": ["Jedan broj telefona uvek dostupan", "Redovni obilasci zgrade dva puta nedeljno"]},
        {"id": 6, "icon": "BarChart3", "title": "Finansijsko izveštavanje", "description": "Redovno podnošenje finansijskih izveštaja stanarima putem blagajničkog izveštaja i bankovnih izvoda.", "details": ["Mesečni blagajnički izveštaji", "Izvodi iz banke sa finansijskim stanjem"]}
    ]
}

DEFAULT_BLOG_POSTS = [
    {
        "id": str(uuid.uuid4()),
        "title": "Prava i obaveze stanara stambene zajednice",
        "slug": "prava-i-obaveze-stanara",
        "excerpt": "Svaki stanar ima zakonska prava, ali i obaveze prema stambenoj zajednici. Saznajte šta to podrazumeva u praksi.",
        "date": "15. maj 2025.",
        "category": "Zakon i propisi",
        "readTime": "5 min",
        "image": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
        "published": True,
        "content": """Zakon o stanovanju i održavanju zgrada definiše prava i obaveze svakog stanara koji je član stambene zajednice.

**Osnovna prava stanara:**
- Pravo glasa na skupštini stambene zajednice
- Pravo uvida u finansijsko stanje zgrade
- Pravo na informisanost o svim radovima i troškovima
- Pravo na prigovor i žalbu

**Osnovne obaveze stanara:**
- Redovno plaćanje zajedničkih troškova
- Učešće u skupštinama i donošenju odluka
- Poštovanje kućnog reda
- Briga o zajedničkim delovima zgrade

Ukoliko stanar ne izmiruje redovne troškove, stambena zajednica ima pravo da pokrene sudski postupak naplate.

**Savet:** Uvek tražite pisani zapisnik sa skupštine i čuvajte sve uplatnice.""",
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Zašto je profesionalni upravnik bolje rešenje od komšije-predsednika?",
        "slug": "zasto-profesionalni-upravnik",
        "excerpt": "Komšija koji zna sve vs. stručno lice koje odgovara zakonom. Koja je razlika i zašto je važna?",
        "date": "28. april 2025.",
        "category": "Upravljanje zgradama",
        "readTime": "7 min",
        "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        "published": True,
        "content": """Mnoge zgrade i danas funkcionišu sa predsednikom skupštine koji je komšija volonter. U većini slučajeva dolazi do problema.

**Problemi sa volonterskim upravljanjem:**
- Nema formalnog obrazovanja za ovu ulogu
- Lični odnosi utiču na odluke
- Nema finansijske odgovornosti
- Nedostupnost u hitnim situacijama

**Šta donosi profesionalni upravnik:**
- Zakonska odgovornost — odgovara imovinom za svoje postupke
- Povoljniji ugovori sa servisnim firmama
- Transparentno finansijsko izveštavanje
- Dostupnost 24/7 za hitne slučajeve""",
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Korak po korak: Kako registrovati stambenu zajednicu",
        "slug": "kako-registrovati-stambenu-zajednicu",
        "excerpt": "Registracija stambene zajednice je zakonska obaveza. Evo šta tačno treba uraditi i u kom redosledu.",
        "date": "10. april 2025.",
        "category": "Administrativni poslovi",
        "readTime": "8 min",
        "image": "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80",
        "published": True,
        "content": """Od stupanja na snagu Zakona o stanovanju i održavanju zgrada, registracija stambene zajednice postala je obavezna.

**Korak 1 — Sazivanje osnivačke skupštine**
Skupštinu može sazvati svaki vlasnik posebnog dela. Pozivi moraju biti dostavljeni minimum 8 dana unapred.

**Korak 2 — Izbor upravnika i predsednika skupštine**
Na skupštini se biraju predsednik skupštine i upravnik.

**Korak 3 — Registracija u lokalnoj samoupravi**
Podnosi se zahtev u opštini sa: zapisnikom, podacima o upravniku i adresom zgrade.

**Korak 4 — Pribavljanje matičnog broja i PIB-a**
Stambena zajednica dobija matični broj i PIB.

**Korak 5 — Otvaranje tekućeg računa**
Sve zajedničke finansije moraju da idu kroz ovaj račun.""",
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "10 najčešćih problema u stambenim zgradama i kako ih rešiti",
        "slug": "cesti-problemi-u-zgradama",
        "excerpt": "Od prokišnjavanja krovova do neurednih stanara — ko je odgovoran za rešavanje problema.",
        "date": "22. mart 2025.",
        "category": "Problemi i rešenja",
        "readTime": "6 min",
        "image": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
        "published": True,
        "content": """U svakodnevnom radu sa stambenim zgradama, susrećemo se sa istim problemima iznova.

**1. Prokišnjavanje krova**
Odgovornost: stambena zajednica, investicioni zahvat.

**2. Kvar lifta**
Odgovornost: stambena zajednica kroz servisni ugovor. Hitna intervencija mora biti dostupna 24h.

**3. Neplaćanje zajedničkih troškova**
Rešenje: opomena, zatim sudska naplata.

**4. Buka i ometanje komšija**
Rešenje: kućni red, opomena, komunalna policija.

**5. Oštećenja u zajedničkim prostorijama**
Odgovornost: stanar koji je prouzrokovao štetu.""",
        "created_at": datetime.utcnow().isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Kako funkcionišu finansije stambene zajednice",
        "slug": "finansije-stambene-zajednice",
        "excerpt": "Ko skuplja novac, ko ima pravo uvida, kako se donose odluke o trošenju.",
        "date": "5. mart 2025.",
        "category": "Finansije",
        "readTime": "6 min",
        "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        "published": True,
        "content": """Finansije stambene zajednice moraju biti transparentne i dostupne svakom stanaru.

**Tekući račun stambene zajednice**
Sav novac ide na zvanični tekući račun, a ne na privatni račun upravnika.

**Fond za tekuće održavanje**
Mesečni iznosi pokrivaju redovne troškove: čišćenje, servisiranje lifta, sitne popravke.

**Ko odlučuje o trošenju?**
Skupština stanara odlučuje o svim radovima čija vrednost prelazi određeni prag.

**Pravo uvida stanara**
Svaki stanar ima pravo da traži blagajnički izveštaj, izvod iz banke i kopiju svakog ugovora.""",
        "created_at": datetime.utcnow().isoformat()
    }
]

# ─── Seed DB ─────────────────────────────────────────────────

async def seed_db():
    # Seed content if not exists
    existing = await db.site_content.find_one({"_id": "main"})
    if not existing:
        await db.site_content.insert_one(DEFAULT_CONTENT)
        logger.info("Seeded site content")

    # Seed blog posts if empty
    count = await db.blog_posts.count_documents({})
    if count == 0:
        await db.blog_posts.insert_many(DEFAULT_BLOG_POSTS)
        logger.info("Seeded blog posts")

# ─── Auth Endpoints ──────────────────────────────────────────

@api_router.post("/auth/login", response_model=TokenResponse)
async def login(req: LoginRequest):
    if req.email != ADMIN_EMAIL:
        raise HTTPException(status_code=401, detail="Pogrešan email ili lozinka")
    if not verify_password(req.password, ADMIN_PASSWORD_HASH):
        raise HTTPException(status_code=401, detail="Pogrešan email ili lozinka")
    token = create_access_token({"sub": req.email})
    return TokenResponse(access_token=token)

@api_router.get("/auth/verify")
async def verify_token(admin: str = Depends(get_current_admin)):
    return {"valid": True, "email": admin}

# ─── Content Endpoints ───────────────────────────────────────

@api_router.get("/content")
async def get_content():
    content = await db.site_content.find_one({"_id": "main"})
    if not content:
        return DEFAULT_CONTENT
    content.pop("_id", None)
    return content

@api_router.put("/content")
async def update_content(data: Dict[str, Any], admin: str = Depends(get_current_admin)):
    data.pop("_id", None)
    await db.site_content.update_one(
        {"_id": "main"},
        {"$set": data},
        upsert=True
    )
    return {"success": True}

# ─── Blog Endpoints ──────────────────────────────────────────

@api_router.get("/blog")
async def get_blog_posts(published_only: bool = True):
    query = {"published": True} if published_only else {}
    posts = await db.blog_posts.find(query).sort("created_at", -1).to_list(100)
    for p in posts:
        p.pop("_id", None)
    return posts

@api_router.get("/blog/{post_id}")
async def get_blog_post(post_id: str):
    # Try by id first, then by slug
    post = await db.blog_posts.find_one({"id": post_id})
    if not post:
        post = await db.blog_posts.find_one({"slug": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    post.pop("_id", None)
    return post

@api_router.post("/blog")
async def create_blog_post(post: BlogPostCreate, admin: str = Depends(get_current_admin)):
    # Check slug uniqueness
    existing = await db.blog_posts.find_one({"slug": post.slug})
    if existing:
        raise HTTPException(status_code=400, detail="Slug već postoji")
    post_dict = post.dict()
    post_dict["id"] = str(uuid.uuid4())
    post_dict["created_at"] = datetime.utcnow().isoformat()
    today = datetime.utcnow()
    months_sr = ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"]
    post_dict["date"] = f"{today.day}. {months_sr[today.month - 1]} {today.year}."
    await db.blog_posts.insert_one(post_dict)
    post_dict.pop("_id", None)
    return post_dict

@api_router.put("/blog/{post_id}")
async def update_blog_post(post_id: str, post: BlogPostUpdate, admin: str = Depends(get_current_admin)):
    update_data = {k: v for k, v in post.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="Nema podataka za ažuriranje")
    result = await db.blog_posts.update_one({"id": post_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    updated = await db.blog_posts.find_one({"id": post_id})
    updated.pop("_id", None)
    return updated

@api_router.delete("/blog/{post_id}")
async def delete_blog_post(post_id: str, admin: str = Depends(get_current_admin)):
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"success": True}

# ─── File Upload ─────────────────────────────────────────────

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

@api_router.post("/upload")
async def upload_file(file: UploadFile = File(...), admin: str = Depends(get_current_admin)):
    suffix = Path(file.filename).suffix.lower()
    if suffix not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Nije dozvoljen ovaj format fajla")
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="Fajl je prevelik (max 5MB)")
    filename = f"{uuid.uuid4()}{suffix}"
    file_path = UPLOAD_DIR / filename
    with open(file_path, "wb") as f:
        f.write(contents)
    return {"filename": filename, "url": f"/api/files/{filename}"}

@api_router.get("/files/{filename}")
async def get_file(filename: str):
    file_path = UPLOAD_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(str(file_path))

# ─── Health check ────────────────────────────────────────────

@api_router.get("/")
async def root():
    return {"message": "Dux Domus CMS API"}

# ─── App setup ───────────────────────────────────────────────

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await seed_db()

@app.on_event("shutdown")
async def shutdown():
    client.close()
