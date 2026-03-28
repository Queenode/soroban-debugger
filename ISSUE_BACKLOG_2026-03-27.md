# Repo Health Snapshot (2026-03-27)

## Working vs Not Working

- Working checks (`8`):
  - `git pull --rebase --autostash`
  - `RUSTFLAGS='-D warnings' cargo check --workspace --all-features`
  - `make fmt`
  - `make lint`
  - `make check-man` (passes with normal host temp-dir permissions)
  - `make test-vscode` (smoke + DAP e2e)
  - `cargo test --test remote_run_tests`
  - CI workflow YAML parses and jobs are structurally valid after fixes
- Not working due to code regressions (`0` identified)
- Not working in restricted sandbox only (`3`):
  - `make test-vscode` without socket permissions (`listen EPERM`)
  - `make check-man` without `/var/.../T` temp-dir permissions (`mktemp` failure)
  - full `cargo test --workspace --all-features` in sandbox when tests bind sockets

## 30 New Issues to Open

1. **CI: Add a sandbox-compatible test profile**  
   Acceptance: add a `ci-sandbox` target that skips socket/bind tests and document when to use it.

2. **CI: Split network-binding integration tests into dedicated job**  
   Acceptance: mark network tests with a custom feature/tag and run in one explicit workflow job.

3. **CI: Run VS Code `test:all` in workflow**  
   Acceptance: add a step for `npm --prefix extensions/vscode run test:all`.

4. **DAP: Document breakpoint verification semantics**  
   Acceptance: docs explain `verified=false` + `setBreakpoint=true` heuristic mode clearly.

5. **DAP: Regression test for first-continue stop reason**  
   Acceptance: test fails if first `continue` emits `step` instead of `breakpoint` when BP is hit.

6. **DAP: Regression test for heuristic breakpoint sync path**  
   Acceptance: test ensures heuristic-mapped breakpoints are actually sent to backend.

7. **DAP: Add assertion for heuristic reason code in e2e**  
   Acceptance: e2e validates breakpoint message/reason indicates no DWARF mapping.

8. **Adapter: Normalize server + heuristic breakpoint mapping rules**  
   Acceptance: one helper computes `setBreakpoint` policy for both server and local fallback responses.

9. **Adapter: Add trace logs for breakpoint sync decisions**  
   Acceptance: debug log shows line/function/verified/setBreakpoint per source breakpoint.

10. **Extension: Add negative test for non-exported function line breakpoint**  
    Acceptance: setBreakpoints returns unverified and does not install runtime breakpoint.

11. **Extension: Add test for no-function source line breakpoint**  
    Acceptance: reason is `HEURISTIC_NO_FUNCTION`; breakpoint remains unverified.

12. **Extension: Add dist drift guard**  
    Acceptance: CI fails when `src/**/*.ts` changes but built `dist` is stale (if dist is committed).

13. **Extension: Emit compact DAP failure diagnostics in test logs**  
    Acceptance: failing e2e prints request/response tail for last 20 DAP messages.

14. **Remote tests: Use ephemeral ports instead of fixed 9245 where possible**  
    Acceptance: tests auto-allocate free ports and avoid collision risk.

15. **Remote tests: Improve skip message for restricted environments**  
    Acceptance: on bind/connect `EPERM`, tests report actionable skip reason with env hint.

16. **Server: Add integration test for Authenticate-before-Handshake compatibility**  
    Acceptance: explicit test covers and documents backward-compatible behavior.

17. **Server: Add integration test for partial TLS config rejection**  
    Acceptance: cert-without-key and key-without-cert both return deterministic error text.

18. **CLI: Add golden tests for versioned JSON envelopes**  
    Acceptance: `run/analyze/inspect/upgrade-check` JSON outputs validated against fixed snapshots.

19. **CLI: Add test for `run --remote` arg validation bypass**  
    Acceptance: remote mode does not require local contract/function arguments.

20. **Analyzer: Add clippy guard checks in pre-commit hooks**  
    Acceptance: pre-commit hook runs `cargo clippy --all-targets --all-features -D warnings`.

21. **Security analyzer: Add unit coverage for frame key optionality paths**  
    Acceptance: tests cover `None` and `Some` function paths in frame-key generation.

22. **Source map: Add lint guard against `format!` on static strings**  
    Acceptance: clippy rule or helper macro prevents regressions of useless string formatting.

23. **Makefile: Add `test-rust-network` target**  
    Acceptance: dedicated target runs only tests requiring bind/connect/network privileges.

24. **Scripts: Make `check_manpages.sh` temp-dir configurable**  
    Acceptance: script honors `TMPDIR` override and documents fallback behavior.

25. **Docs: Add CI troubleshooting page for sandbox/local failures**  
    Acceptance: page maps common failures (`EPERM`, mktemp, socket bind) to fixes.

26. **Bench CI: Add robust cleanup telemetry for worktree failures**  
    Acceptance: failed cleanup emits explicit diagnostics and never leaves stale worktrees silently.

27. **Coverage CI: Pin and validate `jq` JSON extraction path**  
    Acceptance: add test step that fails fast with clear message if JSON schema changes.

28. **Quality: Add a single `make ci-strict` target matching GitHub CI**  
    Acceptance: one local command runs same gates/ordering as workflow jobs.

29. **Quality: Add flaky-test detector for DAP e2e**  
    Acceptance: optional repeat mode (e.g., 5x) with summary of intermittent failures.

30. **Release hygiene: Add changelog note template for CI behavior changes**  
    Acceptance: PR template section requires documenting any CI/test semantic changes.
