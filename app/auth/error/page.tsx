'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            인증 오류
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {error === 'Configuration' && '서버 설정 오류가 발생했습니다.'}
            {error === 'AccessDenied' && '접근이 거부되었습니다.'}
            {error === 'Verification' && '이메일 인증에 실패했습니다.'}
            {!error && '알 수 없는 오류가 발생했습니다.'}
          </p>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/auth/signin"
            className="text-sm font-medium text-red-600 hover:text-red-500"
          >
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
} 