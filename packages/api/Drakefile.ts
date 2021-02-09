import { desc, env, run, sh, task } from 'https://deno.land/x/drake@v1.4.2/mod.ts';

function start(watch = false) {
  return async function() {
    const watchFlag = watch ? '--watch --unstable' : '';

    await sh(
      `deno run --allow-net --allow-env --allow-read ${ watchFlag } src/main.ts`,
      env('--debug') ? { env: { DRAKE_DEBUG: 'true' } } : {},
    );
  };
}

function lint() {
  return async function() {
    await sh('deno lint --unstable src', {});
  };
}

function updateTypings() {
  return async function() {
    await sh('deno types > ./typings/deno.d.ts', {});
  };
}

env('--default-task', 'run:watch');

desc('Run: start');
task('start', [], start());

desc('Run: start:watch');
task('start:watch', [], start(true));

desc('Run: lint');
task('lint', [], lint());

desc('Run: typings');
task('typings', [], updateTypings());

run();
