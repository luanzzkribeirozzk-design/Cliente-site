# Relatório — Conteúdo inicial do Renda Mobile

## Escopo

Foi criada uma carga inicial idempotente no Firebase `donos-b59bd` e o Cliente-site foi ajustado para consumir os dados das coleções já administráveis pelo Admin-site.

Nenhum projeto Firebase novo foi criado. O Admin-site, o webhook Kiwify e o sistema de autenticação não foram alterados.

## Conteúdo criado

| Coleção | Quantidade ativa | Conteúdo |
|---|---:|---|
| `categories` | 7 | Métodos de renda, Central de IA, Clientes, Guias, Finanças, Operação e Conteúdo |
| `content` | 20 | 5 métodos de renda, 5 aulas de IA, 5 conteúdos de clientes e 5 guias |
| `prompts` | 10 | Prompts específicos com instruções e exemplo de resultado |
| `tools` | 10 | Recursos de estratégia, preço, prospecção, conteúdo e operação |
| `challenges` | 2 | Desafio de 7 dias e desafio de 30 dias |
| `notices` | 3 | Boas-vindas, desafio inicial e aviso de novos conteúdos |

Os conteúdos incluem descrição, introdução, passo a passo, exemplos, dicas, erros comuns, conclusão, categoria, ordem e status ativo quando aplicável.

## Funcionalidades ajustadas no Cliente-site

- Métodos de renda filtrados pela categoria correta.
- Central de IA com aulas e prompts.
- Botão de copiar prompt mantido e conectado ao texto completo.
- Central de Clientes consumindo os cinco conteúdos do Firestore.
- Guias consumindo os cinco guias do Firestore.
- Nova seção de Ferramentas consumindo a coleção `tools`.
- Cards com opção **Ler material completo**.
- Avisos ativos exibidos na página inicial.
- Cinco calculadoras funcionais: meta de renda, clientes necessários, preço de serviço, comissão de afiliado e meta mensal.
- Desafios com tarefas reais e progresso salvo em `progress/{uid}_{challengeId}`.
- Navegação mobile atualizada com a seção Ferramentas.

## Idempotência e segurança

O arquivo `scripts/seed-content.mjs`:

- exige `GOOGLE_APPLICATION_CREDENTIALS` local;
- interrompe a execução se o projeto da credencial não for `donos-b59bd`;
- usa IDs fixos e `merge`, evitando documentos duplicados;
- não contém chaves, tokens ou credenciais;
- pode ser executado pelo comando `npm run seed:content`.

O seed foi executado com sucesso e a segunda execução manteve as mesmas quantidades.

## Arquivos alterados

- `src/App.tsx`
- `src/App.css`
- `src/lib/domain.ts`
- `package.json`
- `package-lock.json`
- `scripts/seed-content.mjs`
- `RELATORIO_CONTEUDO_INICIAL.md`

Todos os arquivos pertencem somente ao `Cliente-site`.

## Validação

- `npm test`: **3 testes passaram**.
- `npm run typecheck`: **passou**.
- `npm run lint`: **passou, 0 warnings e 0 errors**.
- `npm run build`: **passou**.
- Auditoria de secrets: **nenhum secret encontrado no código**.
- Deploy Production: **não realizado**, conforme solicitado.

O build apresentou apenas o aviso informativo de bundle JavaScript acima de 500 kB; não é erro de compilação.
