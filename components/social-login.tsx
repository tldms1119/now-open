import Link from "next/link";

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-neutral-300" />
      <div className="flex flex-col gap-3">
        <Link
          className="primary-btn flex h-10 items-center justify-center"
          href="/google/start"
        >
          <span>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.35 11.1H12v2h5.59c-.24 1.26-1.01 2.33-2.09 3.02l3.29 2.55c1.91-1.76 3.01-4.36 3.01-7.57s-1.1-5.81-3.01-7.57l-3.29 2.55c1.08.69 1.85 1.76 2.09 3.02H12v2h9.35z" />
            </svg> */}
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path
                  fill="#4285F4"
                  d="M21.805 10.023h-9.18v3.955h5.262c-.227 1.19-1.37 3.49-5.262 3.49-3.168 0-5.75-2.62-5.75-5.84s2.582-5.84 5.75-5.84c1.805 0 3.017.77 3.71 1.43l2.53-2.46C17.07 3.98 15.09 3 12.625 3 7.82 3 4 6.82 4 11.5s3.82 8.5 8.625 8.5c4.97 0 8.25-3.48 8.25-8.39 0-.56-.06-1.12-.17-1.59z"
                />
                <path
                  fill="#34A853"
                  d="M12.625 21c2.43 0 4.47-.8 5.96-2.17l-2.84-2.32c-.8.54-1.83.86-3.12.86-2.4 0-4.44-1.62-5.17-3.8H4.6v2.39C6.08 18.98 9.09 21 12.625 21z"
                />
                <path
                  fill="#FBBC05"
                  d="M7.455 13.57a5.16 5.16 0 0 1 0-3.14V8.04H4.6a8.5 8.5 0 0 0 0 7.92l2.855-2.39z"
                />
                <path
                  fill="#EA4335"
                  d="M12.625 6.58c1.32 0 2.5.45 3.43 1.34l2.57-2.5C17.09 3.98 15.09 3 12.625 3 9.09 3 6.08 5.02 4.6 8.04l2.855 2.39c.73-2.18 2.77-3.8 5.17-3.8z"
                />
              </g>
            </svg>
          </span>
          <span className="pl-1">Continue with Google</span>
        </Link>
      </div>
    </>
  );
}
