'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    console.error('Auth error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">인증 오류</h1>
        <p className="text-gray-600 mb-6">
          {error === 'Configuration' && '서버 설정에 문제가 있습니다. 관리자에게 문의해주세요.'}
          {error === 'AccessDenied' && '접근이 거부되었습니다.'}
          {error === 'Verification' && '이메일 인증에 실패했습니다.'}
          {error === 'Default' && '알 수 없는 오류가 발생했습니다.'}
        </p>
        <div className="flex justify-end">
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
} 