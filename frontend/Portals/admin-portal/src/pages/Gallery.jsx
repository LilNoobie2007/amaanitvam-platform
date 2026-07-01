import { useState, useEffect } from 'react';
import { Image, Upload, Trash2, Loader2, Plus, Eye, X } from 'lucide-react';
import api from '../config/api';

const MAX_GALLERY_MEDIA_SIZE = 100 * 1024 * 1024;
const GALLERY_UPLOAD_BATCH_SIZE = 5;

const formatBytes = (bytes) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
};

const chunkFiles = (files, size = GALLERY_UPLOAD_BATCH_SIZE) => {
  const chunks = [];
  for (let i = 0; i < files.length; i += size) {
    chunks.push(files.slice(i, i + size));
  }
  return chunks;
};

const isAllowedGalleryFile = (file) => file?.type?.startsWith('image/') || file?.type?.startsWith('video/');
const isVideoMedia = (item) => item?.mediaType === 'video' || item?.contentType?.startsWith('video/');
const getApiBaseUrl = () => (api.defaults.baseURL || '').replace(/\/api\/?$/, '');
const getMediaSrc = (item) => {
  if (!item?.imageUrl) return '';
  if (item.imageUrl.startsWith('http')) return item.imageUrl;
  return `${getApiBaseUrl()}${item.imageUrl}`;
};

const validateGalleryFiles = (files) => {
  const invalidFiles = files.filter((file) => !isAllowedGalleryFile(file));
  if (invalidFiles.length) {
    return `Only photo and video files are allowed. Invalid: ${invalidFiles.map((file) => file.name).join(', ')}`;
  }

  const oversizedFiles = files.filter((file) => file.size > MAX_GALLERY_MEDIA_SIZE);
  if (oversizedFiles.length) {
    return `Each file must be 100MB or smaller. Too large: ${oversizedFiles.map((file) => `${file.name} (${formatBytes(file.size)})`).join(', ')}`;
  }

  return '';
};

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
 const [selectedFiles, setSelectedFiles] = useState([]);
  
  // Edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editFile, setEditFile] = useState(null);
  const [viewingImage, setViewingImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data } = await api.get('/gallery');
      setImages(data.images || []);
    } catch (err) {
      setError('Failed to load gallery media');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const validationError = validateGalleryFiles(files);

    if (validationError) {
      setError(validationError);
      setSelectedFiles([]);
      e.target.value = '';
      return;
    }

    setError('');
    setSelectedFiles(files);
  };
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFiles.length || !newTitle) {
      setError('Please provide a title and select at least one photo or video');
      return;
    }

    const validationError = validateGalleryFiles(selectedFiles);
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploading(true);
    setError('');

    try {
      const batches = chunkFiles(selectedFiles);

      for (const batch of batches) {
        const formData = new FormData();
        formData.append('title', newTitle);

        batch.forEach((file) => {
          formData.append('media', file);
        });

        await api.post('/admin/gallery/bulk', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setIsModalOpen(false);
      setNewTitle('');
      setSelectedFiles([]);
      fetchImages();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload gallery media');
    } finally {
      setUploading(false);
    }
  };

  const handleEditClick = (img) => {
    setEditingImage(img);
    setEditTitle(img.title);
    setEditFile(null);
    setIsEditModalOpen(true);
  };
  const handleEditFileSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setEditFile(null);
      return;
    }

    const validationError = validateGalleryFiles([file]);
    if (validationError) {
      setError(validationError);
      setEditFile(null);
      e.target.value = '';
      return;
    }

    setError('');
    setEditFile(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editTitle) {
      setError('Title cannot be empty');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', editTitle);
    if (editFile) {
      formData.append('image', editFile);
    }

    try {
      await api.put(`/admin/gallery/${editingImage._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsEditModalOpen(false);
      setEditingImage(null);
      setEditTitle('');
      setEditFile(null);
      fetchImages(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update gallery media');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery media item?')) return;
    
    try {
      await api.delete(`/admin/gallery/${id}`);
      setImages(images.filter(img => img._id !== id));
    } catch (err) {
      console.error('Failed to delete gallery media', err);
      alert('Failed to delete gallery media');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gallery Management</h1>
          <p className="text-sm text-slate-500 mt-1">Add or remove photos and videos from the main website gallery</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#56051a] hover:bg-[#56051a]/90 text-white rounded-xl font-medium transition-all shadow-sm shadow-[#56051a]/20"
        >
          <Plus className="w-4 h-4" />
          Add Media
        </button>
      </div>

      {error && !isModalOpen && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 text-[#56051a] animate-spin" />
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Media Found</h3>
          <p className="text-slate-500">The gallery is currently empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div key={img._id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden group">
              <div className="aspect-[4/3] relative bg-slate-100">
                {isVideoMedia(img) ? (
            <video
              src={getMediaSrc(img)}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={getMediaSrc(img)}
              alt={img.title}
              className="w-full h-full object-cover"
            />
          )}
<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={() => setViewingImage(img)}
                    className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-lg transition-colors"
                    title="View Media"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleEditClick(img)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors"
                    title="Edit Media"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                  </button>
                  <button 
                    onClick={() => handleDelete(img._id)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition-colors"
                    title="Delete Media"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100">
                <h3 className="font-semibold text-slate-900 truncate" title={img.title}>
                  {img.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Added on {new Date(img.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {viewingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative animate-[slideUp_0.25s_ease-out]">
            <button 
              onClick={() => setViewingImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full h-[60vh] bg-slate-100 flex items-center justify-center overflow-hidden">
              {isVideoMedia(viewingImage) ? (
            <video
              src={getMediaSrc(viewingImage)}
              className="w-full h-full object-contain"
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={getMediaSrc(viewingImage)}
              alt={viewingImage.title}
              className="w-full h-full object-contain"
            />
          )}
            </div>
            <div className="p-6 bg-white">
              <h2 className="text-xl font-bold text-slate-900 mb-2">{viewingImage.title}</h2>
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-600">
                <p><span className="font-semibold">Uploaded On:</span> {new Date(viewingImage.createdAt).toLocaleString()}</p>
                <p><span className="font-semibold">Type:</span> {viewingImage.contentType || 'N/A'}</p>
                <p><span className="font-semibold">ID:</span> {viewingImage._id}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Add New Media</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-6">
              {error && isModalOpen && (
                <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Media Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Project Manthan Event"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#56051a]/20 focus:border-[#56051a]/30 transition-all outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Upload Photos / Videos
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-slate-400" />
                      <div className="flex text-sm text-slate-600">
                        <label htmlFor="gallery-upload" className="relative cursor-pointer rounded-md font-medium text-[#56051a] hover:text-[#56051a]/80 focus-within:outline-none">
                         <span>
  {selectedFiles.length > 0
    ? `${selectedFiles.length} media item(s) selected`
    : 'Upload one or more photos/videos'}
</span>

<input
  id="gallery-upload"
  name="gallery-upload"
  type="file"
  accept="image/*,video/*"
  multiple
  onChange={handleFileSelect}
  className="sr-only"
/>
                        </label>
                      </div>
                      <p className="text-xs text-slate-500">Photos/videos up to 100MB each. Uploads are sent in batches of 5.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                 disabled={uploading || selectedFiles.length === 0 || !newTitle}
                  className="flex items-center gap-2 px-4 py-2 bg-[#56051a] text-white text-sm font-medium rounded-xl hover:bg-[#56051a]/90 disabled:opacity-50 transition-colors"
                >
                  {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                 {uploading ? 'Uploading...' : selectedFiles.length > 1 ? 'Save Media' : 'Save Media'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900">Edit Media</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-6">
              {error && isEditModalOpen && (
                <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Media Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="e.g. Project Manthan Event"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#56051a]/20 focus:border-[#56051a]/30 transition-all outline-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Upload New Photo/Video (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-8 w-8 text-slate-400" />
                      <div className="flex text-sm text-slate-600">
                        <label htmlFor="edit-file-upload" className="relative cursor-pointer rounded-md font-medium text-[#56051a] hover:text-[#56051a]/80 focus-within:outline-none">
                          <span>{editFile ? editFile.name : 'Upload a new file to replace the old one'}</span>
                          <input 
                            id="edit-file-upload" 
                            name="edit-file-upload" 
                            type="file" 
                            className="sr-only" 
                            accept="image/*,video/*"
                            onChange={handleEditFileSelect}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-slate-500">Leave empty to keep current media</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !editTitle}
                  className="flex items-center gap-2 px-4 py-2 bg-[#56051a] text-white text-sm font-medium rounded-xl hover:bg-[#56051a]/90 disabled:opacity-50 transition-colors"
                >
                  {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {uploading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
