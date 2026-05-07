'use client';

import { useRef, useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { validateFile } from '@/utils/validators';
import { formatFileSize } from '@/utils/helpers';

export default function FileUpload({ onFileSelect, error: externalError }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [localError, setLocalError] = useState(null);
  const inputRef = useRef(null);

  const displayError = localError || externalError;

  function handleFile(selected) {
    const validationError = validateFile(selected);
    if (validationError) {
      setLocalError(validationError);
      return;
    }
    setLocalError(null);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    onFileSelect(selected);
  }

  function handleChange(e) {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  }, []);

  function clearFile() {
    setFile(null);
    setPreview(null);
    setLocalError(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        File <span className="text-red-500">*</span>
        <span className="text-xs text-gray-400 ml-1">(JPG, PNG, GIF · max 10 MB)</span>
      </label>

      {!preview ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-2
            cursor-pointer transition-colors
            ${dragOver ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'}
            ${displayError ? 'border-red-400 bg-red-50' : ''}
          `}
        >
          <div className="p-3 bg-gray-100 rounded-xl">
            <Upload size={22} className="text-gray-500" />
          </div>
          <p className="text-sm text-gray-600 font-medium">
            Drag & drop or <span className="text-indigo-600">browse</span>
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-gray-200">
          <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <ImageIcon size={14} className="text-indigo-600 flex-shrink-0" />
                <span className="text-xs text-gray-700 truncate">{file?.name}</span>
                <span className="text-xs text-gray-400 flex-shrink-0">{formatFileSize(file?.size)}</span>
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="p-1 rounded-md hover:bg-gray-200 transition-colors flex-shrink-0"
                aria-label="Remove file"
              >
                <X size={14} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      {displayError && <p className="text-xs text-red-600">{displayError}</p>}
    </div>
  );
}
