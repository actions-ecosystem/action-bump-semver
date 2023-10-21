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

|       NAME        |                                       DESCRIPTION                                                                        |   TYPE   | REQUIRED | DEFAULT |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------|----------|----------|---------|
| `current_version` | The current version.                                                                                                     | `string` | `true`   | `N/A`   |
| `level`           | A semver update level `{major, premajor, minor, preminor, patch, prepatch, prerelease}`.                                 | `string` | `false`  | `minor` |
| `preID`           | The --preid <identifier> Identifier to be used to prefix premajor, preminor, prepatch or prerelease version increments.  | `string` | `false`   | `N/A`   |

## Outputs

|     NAME      |        DESCRIPTION         |   TYPE   |
|---------------|----------------------------|----------|
| `new_version` | The bumped semver version. | `string` |

## Example

### Simple

```yaml
name: Push a new tag with minor update

on:
  push:
    branches:
      - master

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - uses: actions-ecosystem/action-get-latest-tag@v1
        id: get-latest-tag

      - uses: actions-ecosystem/action-bump-semver@v1
        id: bump-semver
        with:
          current_version: ${{ steps.get-latest-tag.outputs.tag }}
          level: minor

      - uses: actions-ecosystem/action-push-tag@v1
        with:
          tag: ${{ steps.bump-semver.outputs.new_version }}
          message: '${{ steps.bump-semver.outputs.new_version }}: PR #${{ github.event.pull_request.number }} ${{ github.event.pull_request.title }}'
```

For a further practical example, see [.github/workflows/release.yml](.github/workflows/release.yml).

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
