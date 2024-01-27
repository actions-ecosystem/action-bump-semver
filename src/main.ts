import * as core from '@actions/core';
import * as semver from 'semver';

async function run(): Promise<void> {
  try {
    const currentVersion = core.getInput('current_version') as string;
    const bumpLevel = core.getInput('level') as semver.ReleaseType;
    const preID = core.getInput('preID') as string;

    let newVersion;

    if (preID) {
      newVersion = await bumpSemver(currentVersion, bumpLevel, preID);
    } else {
      newVersion = await bumpSemver(currentVersion, bumpLevel);
    }

    if (newVersion) {
      core.setOutput('new_version', newVersion);
    } else {
      core.setFailed('Failed to bump the version.');
    }
  } catch (e) {
    if (e instanceof Error) {
      core.error(e);
      core.setFailed(e.message);
    }
  }
}

async function bumpSemver(
  currentVersion: string,
  bumpLevel: semver.ReleaseType,
  preID?: string
): Promise<string> {
  if (!semver.valid(currentVersion)) {
    throw new Error(`${currentVersion} is not a valid semver`);
  }

  if (!isReleaseType(bumpLevel)) {
    throw new Error(
      `${bumpLevel} is not supported. {major, premajor, minor, preminor, patch, prepatch, prerelease} is available.`
    );
  }

  const hasVPrefix = currentVersion.startsWith('v');

  let bumpedVersion: string;
  if (preID) {
    bumpedVersion = semver.inc(currentVersion, bumpLevel, preID) as string;
  } else {
    bumpedVersion = semver.inc(currentVersion, bumpLevel) as string;
  }

  let newVersion = bumpedVersion;
  if (hasVPrefix) {
    newVersion = `v${newVersion}`;
  }

  return newVersion;
}

function isReleaseType(s: string): s is semver.ReleaseType {
  return ['major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch', 'prerelease'].includes(s);
}

run();
