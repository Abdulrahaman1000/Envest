import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Pencil, Trash2, Upload, Bold, Italic, Underline, List, Link, Image as ImageIcon, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Article {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    views: number;
    datePublished: string;
    content: string;
}

const MOCK_ARTICLES: Article[] = Array.from({ length: 9 }, (_, i) => ({
    id: String(i + 1),
    title: 'What is dividend?',
    excerpt: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
    views: 9,
    datePublished: 'Apr 22, 2025',
    content: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose`,
}));

// ─── Rich Text Toolbar ────────────────────────────────────────────────────────
function RichTextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    const editorRef = useRef<HTMLDivElement>(null);

    const exec = (cmd: string, val?: string) => {
        document.execCommand(cmd, false, val);
        if (editorRef.current) onChange(editorRef.current.innerHTML);
    };

    const tools = [
        { icon: <Bold size={14} />, cmd: 'bold', title: 'Bold' },
        { icon: <Italic size={14} />, cmd: 'italic', title: 'Italic' },
        { icon: <Underline size={14} />, cmd: 'underline', title: 'Underline' },
        { icon: <List size={14} />, cmd: 'insertUnorderedList', title: 'List' },
        { icon: <Link size={14} />, cmd: 'createLink', title: 'Link' },
        { icon: <Quote size={14} />, cmd: 'formatBlock', title: 'Quote' },
    ];

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-200 bg-slate-50 flex-wrap">
                <select className="text-xs border border-slate-200 rounded px-2 py-1 bg-white text-slate-600 focus:outline-none">
                    <option>Normal text</option>
                    <option>Heading 1</option>
                    <option>Heading 2</option>
                </select>
                <div className="w-px h-5 bg-slate-200 mx-1" />
                {tools.map((t) => (
                    <button key={t.cmd} title={t.title} onMouseDown={(e) => { e.preventDefault(); exec(t.cmd); }}
                        className="p-1.5 rounded hover:bg-slate-200 text-slate-600 transition-colors">
                        {t.icon}
                    </button>
                ))}
                <div className="w-px h-5 bg-slate-200 mx-1" />
                <button onMouseDown={(e) => { e.preventDefault(); exec('insertHorizontalRule'); }}
                    className="px-2 py-1 text-xs rounded hover:bg-slate-200 text-slate-600 transition-colors">—</button>
            </div>
            {/* Editable Area */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={() => { if (editorRef.current) onChange(editorRef.current.innerHTML); }}
                className="min-h-[200px] px-4 py-3 text-sm text-slate-700 focus:outline-none"
                data-placeholder="Enter title"
            />
        </div>
    );
}

// ─── Create/Edit Form ─────────────────────────────────────────────────────────
function LearnForm({ onBack, editArticle }: { onBack: () => void; editArticle?: Article | null }) {
    const [title, setTitle] = useState(editArticle?.title || '');
    const [content, setContent] = useState(editArticle?.content || '');
    const [preview, setPreview] = useState<string | null>(editArticle?.image || null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFile = (file: File) => setPreview(URL.createObjectURL(file));

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
                <button onClick={onBack}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors font-medium">
                    <ArrowLeft size={16} />
                    Back
                </button>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900 font-semibold">Learn</span>
            </div>

            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-slate-900">Learn</h1>
                <button onClick={onBack}
                    className="px-5 py-2.5 bg-[#B8860B] text-white rounded-xl text-sm font-semibold hover:bg-[#9a7009] transition-colors">
                    Save details
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
                {/* Title */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Title</label>
                    <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400 placeholder:text-slate-300"
                    />
                </div>

                {/* Upload Image */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Upload Image</label>
                    <div
                        onClick={() => inputRef.current?.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                        className="border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-400 hover:bg-yellow-50/20 transition-all"
                    >
                        {preview ? (
                            <img src={preview} alt="Preview" className="max-h-40 rounded-xl object-cover" />
                        ) : (
                            <>
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                                    <Upload size={18} className="text-slate-400" />
                                </div>
                                <p className="text-sm text-slate-500">
                                    <span className="text-[#B8860B] font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                            </>
                        )}
                        <input ref={inputRef} type="file" accept="image/*" className="hidden"
                            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                    </div>
                </div>

                {/* Newsletter Content */}
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Newsletter Content</label>
                    <RichTextEditor value={content} onChange={setContent} />
                </div>
            </div>
        </div>
    );
}

// ─── Article Detail View ──────────────────────────────────────────────────────
function ArticleDetail({ article, onBack }: { article: Article; onBack: () => void }) {
    return (
        <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-2 text-sm">
                <button onClick={onBack}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors font-medium">
                    <ArrowLeft size={16} />
                    Back
                </button>
                <span className="text-slate-300">|</span>
                <button onClick={onBack} className="text-slate-400 hover:text-slate-600">Learn</button>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900 font-semibold">Details</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <h1 className="text-xl font-bold text-slate-900 mb-3">{article.title}</h1>
                <div className="flex gap-8 mb-6 pb-4 border-b border-slate-100">
                    <div>
                        <p className="text-xs text-slate-400 mb-0.5">No of Views</p>
                        <p className="text-sm font-bold text-slate-900">{article.views}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 mb-0.5">Date Published</p>
                        <p className="text-sm font-bold text-slate-900">{article.datePublished}</p>
                    </div>
                </div>
                <img src={article.image} alt={article.title}
                    className="w-full h-64 object-cover rounded-xl mb-6" />
                {[1, 2, 3, 4, 5].map((p) => (
                    <p key={p} className="text-sm text-slate-600 leading-relaxed mb-4">
                        {article.content}
                    </p>
                ))}
            </div>
        </div>
    );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl text-center">
                <div className="w-12 h-12 bg-yellow-50 border border-yellow-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">⚠️</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">Delete article?</h2>
                <p className="text-sm text-slate-500 mb-6">Are you sure you want to delete this article?</p>
                <div className="flex gap-3">
                    <button onClick={onCancel}
                        className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                        Cancel
                    </button>
                    <button onClick={onConfirm}
                        className="flex-1 py-2.5 bg-[#B8860B] text-white rounded-xl text-sm font-semibold hover:bg-[#9a7009] transition-colors">
                        Yes, delete
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Learn Page ──────────────────────────────────────────────────────────
type View = 'list' | 'create' | 'detail' | 'edit';

export default function Learn() {
    const [view, setView] = useState<View>('list');
    const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
    const [selected, setSelected] = useState<Article | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setArticles(prev => prev.filter(a => a.id !== id));
        setDeleteTarget(null);
    };

    if (view === 'create') return <LearnForm onBack={() => setView('list')} />;
    if (view === 'edit' && selected) return <LearnForm onBack={() => setView('list')} editArticle={selected} />;
    if (view === 'detail' && selected) return <ArticleDetail article={selected} onBack={() => setView('list')} />;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-slate-900">Learn</h1>
                <button onClick={() => setView('create')}
                    className="px-5 py-2.5 bg-[#B8860B] text-white rounded-xl text-sm font-semibold hover:bg-[#9a7009] transition-colors">
                    Add
                </button>
            </div>

            {/* 3-Column Grid */}
            <div className="grid grid-cols-3 gap-5">
                {articles.map((article) => (
                    <div key={article.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-sm font-bold text-slate-900 mb-2">{article.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed mb-5 line-clamp-3">{article.excerpt}</p>
                        <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
                            <button
                                onClick={() => { setSelected(article); setView('detail'); }}
                                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                                <Eye size={15} />
                            </button>
                            <button
                                onClick={() => { setSelected(article); setView('edit'); }}
                                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-yellow-600 transition-colors">
                                <Pencil size={15} />
                            </button>
                            <button
                                onClick={() => setDeleteTarget(article.id)}
                                className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                                <Trash2 size={15} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {deleteTarget && (
                <DeleteModal
                    onConfirm={() => handleDelete(deleteTarget)}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
        </div>
    );
}