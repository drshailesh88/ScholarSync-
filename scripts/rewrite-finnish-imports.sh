#!/bin/bash
# Rewrites FINNISH-style imports to ScholarSync paths
# Run from ScholarSync worktree root

set -e

echo "Rewriting imports in src/lib/illustration/..."

# Services/AI imports
find src/lib/illustration src/components/illustration src/hooks/illustration src/stores/illustration -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from ['\"]../../services/ai/|from '@/lib/illustration/ai/|g" \
  -e "s|from ['\"]../services/ai/|from '@/lib/illustration/ai/|g" \
  -e "s|from ['\"]../../services/export/|from '@/lib/illustration/export/|g" \
  -e "s|from ['\"]../../services/import/|from '@/lib/illustration/import/|g" \
  -e "s|from ['\"]../../services/|from '@/lib/illustration/|g" \
  -e "s|from ['\"]../services/|from '@/lib/illustration/|g" \
  -e "s|from ['\"]./backends/|from '@/lib/illustration/ai/backends/|g" \
  {} +

echo "Rewriting store imports..."
find src/lib/illustration src/components/illustration src/hooks/illustration -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from ['\"]../../store/editorStore['\"]|from '@/stores/illustration/editorStore'|g" \
  -e "s|from ['\"]../../store/|from '@/stores/illustration/|g" \
  -e "s|from ['\"]../../stores/useAgentStore['\"]|from '@/stores/illustration/useAgentStore'|g" \
  -e "s|from ['\"]../../stores/|from '@/stores/illustration/|g" \
  -e "s|from ['\"]../store/|from '@/stores/illustration/|g" \
  -e "s|from ['\"]../stores/|from '@/stores/illustration/|g" \
  {} +

echo "Rewriting component imports..."
find src/components/illustration -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from ['\"]../../components/Canvas|from '@/components/illustration/Canvas|g" \
  -e "s|from ['\"]../../components/Toast|from '@/components/illustration/Toast|g" \
  -e "s|from ['\"]../../components/ErrorBoundary|from '@/components/illustration/ErrorBoundary|g" \
  -e "s|from ['\"]../../components/|from '@/components/illustration/|g" \
  -e "s|from ['\"]../components/|from '@/components/illustration/|g" \
  {} +

echo "Rewriting hook imports..."
find src/components/illustration src/lib/illustration -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from ['\"]../../hooks/|from '@/hooks/illustration/|g" \
  -e "s|from ['\"]../hooks/|from '@/hooks/illustration/|g" \
  {} +

echo "Rewriting lib imports..."
find src/lib/illustration src/components/illustration -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from ['\"]../../lib/ai|from '@/lib/illustration/lib/ai|g" \
  -e "s|from ['\"]../../lib/canvas|from '@/lib/illustration/lib/canvas|g" \
  -e "s|from ['\"]../../lib/color|from '@/lib/illustration/lib/color|g" \
  -e "s|from ['\"]../../lib/export['\"]|from '@/lib/illustration/lib/export'|g" \
  -e "s|from ['\"]../../lib/export/|from '@/lib/illustration/lib/export/|g" \
  -e "s|from ['\"]../../lib/freehand|from '@/lib/illustration/lib/freehand|g" \
  -e "s|from ['\"]../../lib/glfx|from '@/lib/illustration/lib/glfx|g" \
  -e "s|from ['\"]../../lib/icons|from '@/lib/illustration/lib/icons|g" \
  -e "s|from ['\"]../../lib/image|from '@/lib/illustration/lib/image|g" \
  -e "s|from ['\"]../../lib/paper|from '@/lib/illustration/lib/paper|g" \
  -e "s|from ['\"]../../lib/rough|from '@/lib/illustration/lib/rough|g" \
  -e "s|from ['\"]../../lib/shapes|from '@/lib/illustration/lib/shapes|g" \
  -e "s|from ['\"]../../lib/visualization|from '@/lib/illustration/lib/visualization|g" \
  -e "s|from ['\"]../../lib/|from '@/lib/illustration/lib/|g" \
  -e "s|from ['\"]../lib/|from '@/lib/illustration/lib/|g" \
  {} +

echo "Rewriting data imports..."
find src/lib/illustration -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from ['\"]../../data/icons/|from '@/lib/illustration/data/icons/|g" \
  -e "s|from ['\"]../../data/templates/|from '@/lib/illustration/data/templates/|g" \
  -e "s|from ['\"]../../data/colors/|from '@/lib/illustration/data/colors/|g" \
  -e "s|from ['\"]../../data/|from '@/lib/illustration/data/|g" \
  -e "s|from ['\"]../data/|from '@/lib/illustration/data/|g" \
  -e "s|from ['\"]./data/|from '@/lib/illustration/data/|g" \
  {} +

echo "Rewriting type imports..."
find src/lib/illustration src/components/illustration src/hooks/illustration src/stores/illustration -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from ['\"]../../types/index['\"]|from '@/lib/illustration/types'|g" \
  -e "s|from ['\"]../../types/index.js['\"]|from '@/lib/illustration/types'|g" \
  -e "s|from ['\"]../../types/|from '@/lib/illustration/types/|g" \
  -e "s|from ['\"]../types/|from '@/lib/illustration/types/|g" \
  {} +

echo "Rewriting editor imports..."
find src/lib/illustration src/components/illustration -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from ['\"]../../editor/|from '@/lib/illustration/editor/|g" \
  {} +

echo "Rewriting config imports..."
find src/lib/illustration src/components/illustration -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "s|from ['\"]../../config|from '@/lib/illustration/config|g" \
  -e "s|from ['\"]../config|from '@/lib/illustration/config|g" \
  {} +

echo "Removing react-router-dom imports (replaced by Next.js)..."
find src/components/illustration/pages -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e "/import.*from ['\"]react-router-dom['\"];/d" \
  {} +

echo "Adding 'use client' to all .tsx component files..."
find src/components/illustration -name "*.tsx" -exec sh -c '
  if ! head -1 "$1" | grep -q "use client"; then
    sed -i '' "1i\\
\"use client\";" "$1"
  fi
' _ {} \;

echo "Import rewriting complete!"
