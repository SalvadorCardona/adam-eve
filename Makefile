start-dev:
	pnpm run dev
pwa-ci:
	pnpm run lint

coverage:
	pnpm vitest --coverage

test-watch:
	pnpm vitest --watch

test:
	pnpm vitest run

lint:
	pnpm run lint

lint-watch:
	pnpm run lint --watch

ci: lint test

watch:
	npx concurrently "tsc --watch --noEmit" "vitest --watch" "vite"