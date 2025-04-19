'use client';

import { useState } from 'react';
import { seedDatabase } from '@/lib/actions/seed';

export default function SeedButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeed = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const result = await seedDatabase();
      
      if (result.success) {
        // Refresh the page to show new data
        window.location.reload();
      } else {
        setMessage(result.error || '오류가 발생했습니다.');
      }
    } catch (error) {
      setMessage('샘플 데이터 추가 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={handleSeed}
        disabled={isLoading}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
      >
        {isLoading ? '처리 중...' : '샘플 데이터 추가'}
      </button>
      {message && (
        <p className={`mt-2 text-sm ${message.includes('성공') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
} 