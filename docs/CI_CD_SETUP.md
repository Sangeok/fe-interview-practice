# CI/CD Setup Documentation

## 개요
프로젝트에 GitHub Actions CI 및 Vercel 자동 배포 설정 완료

## 추가된 파일

### 1. `.github/workflows/ci.yml`
**목적**: PR/푸시 시 자동 품질 검증

**전체 코드**:
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  ci:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm test

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_GEMINI_API_KEY: ${{ secrets.NEXT_PUBLIC_GEMINI_API_KEY }}
```

**트리거**:
- `main`, `develop` 브랜치 푸시
- `main`, `develop` 대상 PR

**실행 단계**:
1. **Checkout** - 저장소 코드 체크아웃
2. **Setup Node.js** - Node.js 20.x 설치 및 npm 캐시 활성화
3. **Install dependencies** - `npm ci`로 정확한 버전 의존성 설치
4. **Lint** - ESLint로 코드 스타일 검증
5. **Test** - Vitest로 단위 테스트 실행
6. **Build** - Next.js 프로덕션 빌드 검증 (Gemini API 키 필요)

**실행 환경**: ubuntu-latest, Node.js 20.x

### 2. `vercel.json`
**목적**: Vercel 배포 설정

**전체 코드**:
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "git": {
    "deploymentEnabled": {
      "main": true,
      "develop": true
    }
  }
}
```

**설정 설명**:
- `buildCommand`: 프로덕션 빌드 명령어
- `devCommand`: 개발 서버 실행 명령어
- `installCommand`: 의존성 설치 명령어
- `framework`: Next.js 프레임워크 자동 인식
- `git.deploymentEnabled`: `main`, `develop` 브랜치 자동 배포 활성화

## 환경 변수 설정

### ✅ GitHub Secrets 설정 (필수)
**경로**: Repository → Settings → Secrets and variables → Actions

**설정 단계**:
1. GitHub 저장소 → **Settings** 클릭
2. 왼쪽 메뉴 → **Secrets and variables** → **Actions** 클릭
3. **New repository secret** 버튼 클릭
4. 다음 값 추가:
   - **Name**: `NEXT_PUBLIC_GEMINI_API_KEY`
   - **Secret**: Gemini API 키 값 입력
5. **Add secret** 클릭하여 저장

**⚠️ 주의**: 이 작업을 완료하지 않으면 CI 빌드 단계에서 실패합니다.

### ✅ Vercel Environment Variables 설정 (필수)
**경로**: Vercel Dashboard → Project Settings → Environment Variables

**설정 단계**:
1. [Vercel Dashboard](https://vercel.com) 로그인
2. 프로젝트 선택
3. **Settings** 탭 → **Environment Variables** 메뉴
4. 다음 값 추가:
   - **Key**: `NEXT_PUBLIC_GEMINI_API_KEY`
   - **Value**: Gemini API 키 값
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development 모두 체크
5. **Save** 클릭

**⚠️ 주의**: 이 작업을 완료하지 않으면 Vercel 배포 시 빌드 실패하거나 앱이 정상 동작하지 않습니다.

## 배포 플로우

### 자동 배포
1. `main` 브랜치 푸시 → Production 배포
2. `develop` 브랜치 푸시 → Preview 배포
3. PR 생성 → Preview 배포 (PR별 고유 URL)

### CI 검증
- PR 생성/업데이트 시 자동 실행
- 모든 체크 통과 필요 (권장: 브랜치 보호 규칙 활성화)

## 🛡️ 브랜치 보호 규칙 (권장)

**경로**: Repository → Settings → Branches → Add branch protection rule

### `main` 브랜치 보호 설정:
1. **Settings** → **Branches** 클릭
2. **Add branch protection rule** 클릭
3. **Branch name pattern**: `main` 입력
4. 다음 옵션 활성화:
   - ✅ **Require status checks to pass before merging**
     - 검색창에서 `ci` 선택 (첫 CI 실행 후 나타남)
   - ✅ **Require pull request reviews before merging** (권장)
5. **Create** 클릭

### `develop` 브랜치 보호 설정:
- 위와 동일한 과정으로 `develop` 브랜치에 대해 반복

**효과**: PR 머지 전에 CI 검증이 필수로 통과해야 하며, 코드 리뷰 승인이 필요합니다.

## 🔍 설정 확인 방법

### GitHub Actions 작동 확인:
1. `develop` 브랜치에 커밋 푸시
2. GitHub 저장소 → **Actions** 탭 클릭
3. 워크플로우 실행 확인 (Lint → Test → Build 순서)
4. 모든 단계가 녹색 체크마크로 통과하는지 확인

### Vercel 배포 확인:
1. `develop` 브랜치 푸시 후 Vercel Dashboard 확인
2. Preview 배포 URL 생성 확인
3. 배포된 앱 URL 접속하여 정상 작동 확인
4. Gemini API 연동 기능 테스트

### CI/CD 통합 테스트:
1. 테스트 브랜치 생성 후 PR 생성
2. GitHub Actions CI 자동 실행 확인
3. Vercel Preview 배포 자동 생성 확인
4. PR에 배포 링크 및 CI 상태 표시 확인

## 다음 단계 (선택사항)

### 품질 개선
- [ ] Dependabot 활성화 (의존성 자동 업데이트)
- [ ] Codecov 연동 (테스트 커버리지 추적)
- [ ] Lighthouse CI (성능 모니터링)

### 모니터링
- [ ] Vercel Analytics 활성화
- [ ] Error tracking (Sentry 등)

## 트러블슈팅

### CI 실패 시
1. 로컬에서 확인: `npm run lint && npm test && npm run build`
2. 의존성 문제: `npm ci` 실행 후 재테스트
3. 환경 변수: GitHub Secrets 설정 확인

### 배포 실패 시
1. Vercel Dashboard에서 로그 확인
2. 환경 변수 설정 확인
3. 빌드 명령어 검증: `npm run build`

## 작업 완료일
2025-11-07
