import * as core from '@actions/core';
import * as semver from 'semver';

async function run(): Promise<void> {
  try {
    const currentVersion = core.getInput('current_version');
    const bumpLevel = core.getInput('level');

    if (!semver.valid(currentVersion)) {
      const error = `${currentVersion} is not a valid semver`;
      core.error(error);
      core.setFailed(error);
      return;
    }

    // https://semver.org/#is-v123-a-semantic-version
    // If the current version has 'v' prefix (e.g., v1.2.3), keep the prefix in the new version too.
    const hasVPrefix = currentVersion.startsWith('v');

    if (isReleaseType(bumpLevel)) {
      const newVersion = semver.inc(currentVersion, bumpLevel);
      if (hasVPrefix) {
        core.setOutput('new_version', `v${newVersion}`);
        return;
      }
      core.setOutput('new_version', newVersion);
      return;
    }

    const error = `${bumpLevel} is not supported. {major, premajor, minor, preminor, patch, prepatch, prerelease} is available.`;
    core.error(error);
    core.setFailed(error);
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

function isReleaseType(s: string): s is semver.ReleaseType {
  return [
    'major',
    'premajor',
    'minor',
    'preminor',
    'patch',
    'prepatch',
    'prerelease'
  ].includes(s);
}

run();
