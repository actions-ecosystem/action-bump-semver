import * as core from '@actions/core';
import * as semver from 'semver';

async function run(): Promise<void> {
  try {
    const currentVersion = core.getInput('current_version');
    const bumpLevel = core.getInput('level');

    await bumpSemver(currentVersion, bumpLevel);
  } catch (e) {
    core.error(e);
    core.setFailed(e.message);
  }
}

async function bumpSemver(
  currentVersion: string,
  bumpLevel: string
): Promise<void> {
  if (!semver.valid(currentVersion)) {
    throw new Error(`${currentVersion} is not a valid semver`);
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

  throw new Error(
    `${bumpLevel} is not supported. {major, premajor, minor, preminor, patch, prepatch, prerelease} is available.`
  );
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
