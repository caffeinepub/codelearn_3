# CodeLearn

## Current State
Novo projeto, sem código existente.

## Requested Changes (Diff)

### Add
- App de aprendizado de programação gratuito
- Três níveis de dificuldade: Iniciante, Moderado, Experiente
- Catálogo de lições/módulos organizados por nível
- Cada lição tem: título, descrição, conteúdo de texto explicativo, exemplos de código
- Rastreamento de progresso do usuário (lições concluídas)
- Tela inicial com apresentação dos níveis e estatísticas
- Tela de listagem de lições por nível
- Tela de visualização de lição (conteúdo completo)
- Marcar lição como concluída
- Linguagens cobertas: Python (iniciante), JavaScript (moderado), TypeScript/Algoritmos (experiente)
- Conteúdo seed com pelo menos 3 lições por nível

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend Motoko: tipos Lesson, Progress; métodos getLessons, getLessonById, markComplete, getProgress
2. Seed data com lições reais para cada nível
3. Frontend: página inicial com cards de nível, listagem de lições, visualizador de lição com código formatado
4. Navegação entre páginas
5. Indicadores de progresso por nível
