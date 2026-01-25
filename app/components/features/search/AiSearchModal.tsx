'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import AiSearchModalInput from './AiSearchModalInput';
import AiSearchResultsSection from './AiSearchResultsSection';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AiSearchModal({ isOpen, onClose }: SearchModalProps) {
  const [prompt, setPrompt] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    } else if (!isOpen) {
      // Очищаем состояние при закрытии модалки
      setPrompt('');
      setSearchQuery('');
    }
  }, [isOpen]);

  const handleSearch = useCallback(() => {
    if (prompt.trim()) {
      setSearchQuery(prompt.trim());
    }
  }, [prompt]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <AiSearchModalInput
          prompt={prompt}
          setPrompt={setPrompt}
          handleKeyDown={handleKeyDown}
          onSearch={handleSearch}
          onClose={onClose}
          inputRef={inputRef}
        />

        <AiSearchResultsSection prompt={searchQuery} onClose={onClose} />
      </div>
    </div>
  );
}

export default AiSearchModal;
