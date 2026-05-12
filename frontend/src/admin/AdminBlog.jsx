import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAdmin } from '../contexts/AdminContext';
import {
  Plus, Pencil, Trash2, Eye, EyeOff, Search, X, Save,
  Upload, Image, ArrowLeft, CheckCircle
} from 'lucide-react';

const CATEGORIES = ['Zakon i propisi', 'Upravljanje zgradama', 'Administrativni poslovi', 'Problemi i rešenja', 'Finansije'];

const slugify = (text) =>
  text.toLowerCase().trim()
    .replace(/[čć]/g, 'c').replace(/[šđ]/g, 's').replace(/ž/g, 'z')
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

const AdminBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('list'); // list | create | edit
  const [editingPost, setEditingPost] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { authHeaders, API } = useAdmin();

  const emptyForm = { title: '', slug: '', excerpt: '', content: '', category: CATEGORIES[0], readTime: '5 min', image: '', published: true };
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef();
  const [uploadingImage, setUploadingImage] = useState(false);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/blog?published_only=false`, { headers: authHeaders() });
      setPosts(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = posts.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const openCreate = () => { setForm(emptyForm); setFormErrors({}); setView('create'); };
  const openEdit = (post) => {
    setForm({
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || CATEGORIES[0],
      readTime: post.readTime || '5 min',
      image: post.image || '',
      published: post.published !== false
    });
    setEditingPost(post);
    setFormErrors({});
    setView('edit');
  };

  const validateForm = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Naslov je obavezan';
    if (!form.slug.trim()) e.slug = 'Slug je obavezan';
    if (!form.excerpt.trim()) e.excerpt = 'Kratak opis je obavezan';
    if (!form.content.trim()) e.content = 'Sadržaj je obavezan';
    return e;
  };

  const handleSave = async () => {
    const errs = validateForm();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    setSaving(true);
    try {
      if (view === 'create') {
        await axios.post(`${API}/blog`, form, { headers: authHeaders() });
      } else {
        await axios.put(`${API}/blog/${editingPost.id}`, form, { headers: authHeaders() });
      }
      setSaveSuccess(true);
      setTimeout(() => { setSaveSuccess(false); setView('list'); fetchPosts(); }, 1200);
    } catch (e) {
      alert(e.response?.data?.detail || 'Greška pri čuvanju');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/blog/${id}`, { headers: authHeaders() });
      setDeleteConfirm(null);
      fetchPosts();
    } catch (e) {
      alert('Greška pri brisanju');
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploadingImage(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await axios.post(`${API}/upload`, fd, {
        headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' }
      });
      const fullUrl = `${BACKEND_URL}${res.data.url}`;
      setForm(p => ({ ...p, image: fullUrl }));
    } catch (e) {
      alert('Greška pri uploadu slike');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleChange = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(p => {
      const next = { ...p, [field]: val };
      if (field === 'title' && view === 'create') next.slug = slugify(val);
      return next;
    });
    if (formErrors[field]) setFormErrors(p => ({ ...p, [field]: '' }));
  };

  if (view === 'create' || view === 'edit') {
    return (
      <div className="max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setView('list')} className="p-2 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <h2 className="text-xl font-bold text-[#0a2d5e]">
            {view === 'create' ? 'Novi članak' : 'Uredi članak'}
          </h2>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setView('list')}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Otkaži
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-[#1e5f9e] hover:bg-[#0a2d5e] text-white text-sm font-semibold rounded-lg transition-colors disabled:bg-gray-300"
            >
              {saveSuccess ? <><CheckCircle size={15} /> Sačuvano!</> :
                saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :
                  <><Save size={15} /> Sačuvaj</>
              }
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {/* Title */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Naslov *</label>
            <input
              value={form.title}
              onChange={handleChange('title')}
              placeholder="Naslov članka"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 focus:border-[#28a8e0] ${formErrors.title ? 'border-red-400' : 'border-gray-200'}`}
            />
            {formErrors.title && <p className="text-xs text-red-500 mt-1">{formErrors.title}</p>}

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Slug (URL)</label>
                <input
                  value={form.slug}
                  onChange={handleChange('slug')}
                  placeholder="slug-clanka"
                  className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 focus:border-[#28a8e0] ${formErrors.slug ? 'border-red-400' : 'border-gray-200'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Vreme čitanja</label>
                <input
                  value={form.readTime}
                  onChange={handleChange('readTime')}
                  placeholder="5 min"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 focus:border-[#28a8e0]"
                />
              </div>
            </div>
          </div>

          {/* Category + Published */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kategorija</label>
                <select
                  value={form.category}
                  onChange={handleChange('category')}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 bg-white"
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div
                    onClick={() => setForm(p => ({ ...p, published: !p.published }))}
                    className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${form.published ? 'bg-[#28a8e0]' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.published ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Objavljeno</span>
                </label>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Naslovna slika</label>
            {form.image && (
              <div className="relative mb-3">
                <img src={form.image} alt="preview" className="w-full h-40 object-cover rounded-lg border border-gray-200" />
                <button onClick={() => setForm(p => ({ ...p, image: '' }))} className="absolute top-2 right-2 bg-white text-gray-600 rounded-full p-1 shadow hover:bg-red-50 hover:text-red-600 transition-colors">
                  <X size={14} />
                </button>
              </div>
            )}
            <div className="flex gap-3">
              <input
                value={form.image}
                onChange={handleChange('image')}
                placeholder="https://... ili upload ispod"
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 focus:border-[#28a8e0]"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="flex items-center gap-2 px-4 py-2 bg-[#e8f4fd] hover:bg-[#d0e8f7] text-[#1e5f9e] text-sm font-semibold rounded-lg transition-colors"
              >
                {uploadingImage ? <div className="w-4 h-4 border-2 border-[#1e5f9e]/30 border-t-[#1e5f9e] rounded-full animate-spin" /> : <Upload size={15} />}
                Upload
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e.target.files[0])} />
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kratak opis *</label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={handleChange('excerpt')}
              placeholder="Kratki opis koji se prikazuje na listi blogova..."
              className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 focus:border-[#28a8e0] resize-none ${formErrors.excerpt ? 'border-red-400' : 'border-gray-200'}`}
            />
            {formErrors.excerpt && <p className="text-xs text-red-500 mt-1">{formErrors.excerpt}</p>}
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Sadržaj * </label>
            <p className="text-xs text-gray-400 mb-2">Koristite **tekst** za naslove i - za liste</p>
            <textarea
              rows={14}
              value={form.content}
              onChange={handleChange('content')}
              placeholder="Sadržaj članka..."
              className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 focus:border-[#28a8e0] resize-y font-mono ${formErrors.content ? 'border-red-400' : 'border-gray-200'}`}
            />
            {formErrors.content && <p className="text-xs text-red-500 mt-1">{formErrors.content}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0a2d5e]">Blog</h1>
          <p className="text-gray-400 text-sm mt-0.5">{posts.length} {posts.length === 1 ? 'članak' : 'članaka'}</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#1e5f9e] hover:bg-[#0a2d5e] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus size={16} /> Novi članak
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Pretraži po naslovu ili kategoriji..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 focus:border-[#28a8e0]"
        />
      </div>

      {/* Posts list */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-2 border-[#28a8e0]/30 border-t-[#28a8e0] rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <FileText size={40} className="mx-auto mb-3 opacity-30" />
          <p>Nema članaka</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(post => (
            <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 hover:border-[#c5e0f5] transition-colors">
              {post.image && (
                <img src={post.image} alt="" className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${post.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {post.published ? 'Objavljeno' : 'Draft'}
                  </span>
                  <span className="text-xs text-gray-400">{post.category}</span>
                </div>
                <h3 className="font-semibold text-[#0a2d5e] text-sm truncate">{post.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{post.date} · {post.readTime}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => openEdit(post)} className="p-2 text-gray-400 hover:text-[#1e5f9e] hover:bg-[#e8f4fd] rounded-lg transition-colors">
                  <Pencil size={15} />
                </button>
                <button onClick={() => setDeleteConfirm(post)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirm dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <h3 className="font-bold text-[#0a2d5e] text-lg mb-2">Obrisati članak?</h3>
            <p className="text-gray-500 text-sm mb-5">"{deleteConfirm.title}" će biti trajno obrisan.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Otkaži
              </button>
              <button onClick={() => handleDelete(deleteConfirm.id)} className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors">
                Obriši
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
