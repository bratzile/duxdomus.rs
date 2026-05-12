import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Clock, ArrowRight, Tag, BookOpen } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const categoryColors = {
  'Zakon i propisi': 'bg-blue-50 text-blue-700',
  'Upravljanje zgradama': 'bg-indigo-50 text-indigo-700',
  'Administrativni poslovi': 'bg-purple-50 text-purple-700',
  'Problemi i rešenja': 'bg-orange-50 text-orange-700',
  'Finansije': 'bg-emerald-50 text-emerald-700'
};

const renderContent = (text) =>
  text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**'))
      return <h3 key={i} className="text-lg font-bold text-[#0a2d5e] mt-6 mb-2">{line.replace(/\*\*/g, '')}</h3>;
    if (line.startsWith('- '))
      return (
        <li key={i} className="flex items-start gap-2 text-gray-600 text-sm mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#28a8e0] mt-2 flex-shrink-0" />
          {line.replace('- ', '')}
        </li>
      );
    if (line.trim() === '') return <div key={i} className="h-2" />;
    return <p key={i} className="text-gray-600 text-sm leading-relaxed mb-3">{line}</p>;
  });

/* ── Blog post detail view ── */
const BlogPost = ({ slug }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/blog/${slug}`)
      .then(r => setPost(r.data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#28a8e0]/30 border-t-[#28a8e0] rounded-full animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#0a2d5e] mb-4">Članak nije pronađen</h2>
        <Link to="/blog" className="text-[#28a8e0] hover:underline font-medium">← Nazad na blog</Link>
      </div>
    </div>
  );

  const catColor = categoryColors[post.category] || 'bg-gray-100 text-gray-600';

  return (
    <div className="min-h-screen bg-[#f8fbff]">
      <div className="relative h-64 md:h-80">
        {post.image && (
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a2d5e]/80 via-[#0a2d5e]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full mb-3 inline-block ${catColor}`}>
            {post.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{post.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-6 border-b border-gray-200">
          <span className="flex items-center gap-1.5"><Calendar size={14} />{post.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime} čitanja</span>
          <span className="flex items-center gap-1.5"><Tag size={14} />{post.category}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <ul className="space-y-0 list-none p-0">{renderContent(post.content || '')}</ul>
        </div>

        <div className="mt-10 bg-[#0a2d5e] rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Imate pitanje ili trebate pomoć?</h3>
          <p className="text-[#a8d8f0] mb-5 text-sm">Kontaktirajte nas i saznajte kako možemo pomoći Vašoj zgradi.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/kontakt" className="inline-flex items-center gap-2 bg-[#28a8e0] hover:bg-[#1e8fc0] text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all">
              Kontaktirajte nas <ArrowRight size={14} />
            </Link>
            <Link to="/blog" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all">
              ← Svi članci
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Blog list view ── */
const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Sve');

  useEffect(() => {
    axios.get(`${API}/blog`)
      .then(r => setPosts(r.data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['Sve', ...new Set(posts.map(p => p.category))];
  const filtered = selectedCategory === 'Sve' ? posts : posts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-[#0a2d5e] to-[#1e5f9e] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <span className="text-[#7dd3f8] font-semibold text-xs uppercase tracking-widest">Edukativni sadržaj</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">Blog</h1>
          <p className="text-[#a8d8f0] max-w-2xl mx-auto">
            Korisni saveti i informacije o upravljanju stambenim zgradama, zakonu i pravima stanara.
          </p>
        </div>
      </div>

      <section className="py-12 max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border
                ${selectedCategory === cat ? 'bg-[#1e5f9e] text-white border-[#1e5f9e]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#28a8e0] hover:text-[#28a8e0]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#28a8e0]/30 border-t-[#28a8e0] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => {
              const catColor = categoryColors[post.category] || 'bg-gray-100 text-gray-600';
              return (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-[#e8f4fd] flex items-center justify-center">
                        <BookOpen size={32} className="text-[#28a8e0]/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColor}`}>{post.category}</span>
                    </div>
                    <h2 className="font-bold text-[#0a2d5e] text-lg leading-snug mb-2 group-hover:text-[#1e5f9e] transition-colors">{post.title}</h2>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                      </div>
                      <span className="text-[#28a8e0] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        Čitaj <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

const Blog = ({ slug }) => slug ? <BlogPost slug={slug} /> : <BlogList />;
export default Blog;
