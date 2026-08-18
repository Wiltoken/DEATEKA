# Control de versiones

Convenciones de Git para el desarrollo de DEATEKA.

## Rama principal

- `main` es la rama estable y siempre debe estar desplegable.
- Nadie commitea directamente a `main`: los cambios entran por **pull requests**.

## Flujo de trabajo

```
main ─────────────────────────────────────────────►
   └── feature/xxx ──► (PR) ──► merge a main
```

1. Creá una rama desde `main`:

   ```bash
   git checkout main
   git pull
   git checkout -b feature/nombre-de-la-funcion
   ```

2. Desarrollá en commits pequeños y atómicos.
3. Abrí un pull request hacia `main`.
4. Merge con *squash* o *merge* según el acuerdo del equipo.

## Nombres de ramas

| Prefijo | Uso |
|---------|-----|
| `feature/` | Nueva funcionalidad |
| `fix/` | Corrección de errores |
| `docs/` | Cambios de documentación |
| `chore/` | Tareas de mantenimiento |
| `refactor/` | Refactorización sin cambio de comportamiento |

## Convención de commits (Conventional Commits)

Cada commit debe tener el formato:

```
<tipo>(<alcance>): <descripción>
```

| Tipo | Cuándo usarlo |
|------|---------------|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de un bug |
| `docs` | Solo documentación |
| `chore` | Tareas de mantenimiento |
| `refactor` | Refactorización |

Ejemplos:

- `feat: connect pages to Prisma data`
- `fix: checkout confirmation screen not shown`
- `docs: add user manual`

## Versiones

Seguimos **SemVer** (`MAJOR.MINOR.PATCH`):

| Cambio | Regla |
|--------|-------|
| Breaking change | +1 `MAJOR` |
| Nueva funcionalidad | +1 `MINOR` |
| Bug fix | +1 `PATCH` |

Cada release se registra en el [CHANGELOG](../CHANGELOG.md).

## Qué se versiona

| Se versiona | No se versiona |
|-------------|----------------|
| Código fuente (`src/`) | `node_modules/` |
| Esquema y migraciones (`prisma/`) | Base de datos local (`*.db`) |
| Documentación (`docs/`) | Variables de entorno (`.env`) |
| `.env.example` | Artefactos de build (`.next/`) |

## Checklist antes de un PR

- [ ] El código compila: `npm run build`
- [ ] El lint pasa: `npm run lint`
- [ ] No se incluyen secretos ni archivos generados
- [ ] El commit respeta Conventional Commits
- [ ] La documentación relevante está actualizada
