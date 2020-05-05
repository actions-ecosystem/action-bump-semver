# Action Bump Semver

[![actions-workflow-test][actions-workflow-test-badge]][actions-workflow-test]
[![release][release-badge]][release]
[![license][license-badge]][license]

This is a GitHub Action to bump the given semver version up.

For example:

- `current_version=v1.2.3`, `level=major` -> `new_version=v2.0.0`
- `current_version=1.2.3`, `level=major` -> `new_version=2.0.0`
- `current_version=v1.2.3`, `level=minor` -> `new_version=v1.3.0`

It would be more useful to use this with other GitHub Actions' outputs.

## Inputs

|       NAME        |                                       DESCRIPTION                                        |   TYPE   | REQUIRED | DEFAULT |
|-------------------|------------------------------------------------------------------------------------------|----------|----------|---------|
| `current_version` | The current version.                                                                     | `string` | `true`   | `N/A`   |
| `level`           | A semver update level ({major, premajor, minor, preminor, patch, prepatch, prerelease}). | `string` | `false`  | `minor` |

## Outputs

|     NAME      |        DESCRIPTION         |   TYPE   |
|---------------|----------------------------|----------|
| `new_version` | The bumped semver version. | `string` |

## License

Copyright 2020 The Actions Ecosystem Authors.

Action Bump Semver is released under the [Apache License 2.0](./LICENSE).

<!-- badge links -->

[actions-workflow-test]: https://github.com/actions-ecosystem/action-bump-semver/actions?query=workflow%3ATest
[actions-workflow-test-badge]: https://img.shields.io/github/workflow/status/actions-ecosystem/action-bump-semver/Test?label=Test&style=for-the-badge&logo=github

[release]: https://github.com/actions-ecosystem/action-bump-semver/releases
[release-badge]: https://img.shields.io/github/v/release/actions-ecosystem/action-bump-semver?style=for-the-badge&logo=github

[license]: LICENSE
[license-badge]: https://img.shields.io/github/license/actions-ecosystem/action-bump-semver?style=for-the-badge
