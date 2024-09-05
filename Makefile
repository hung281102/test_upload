ifneq (,$(wildcard ./.env))
    include .env
    export
endif

ifneq (,$(wildcard ./.env.local))
    include .env.local
    export
endif

.PHONY: codegen
codegen:
	@echo "Generating code..."
	pnpm graphql-codegen --config codegen.ts
