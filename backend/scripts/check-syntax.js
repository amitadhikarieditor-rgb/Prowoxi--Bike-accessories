// Run `npm run check` after installing dependencies. This script is intentionally tiny; Node's --check can be used file-by-file.
console.log('Use: find . -name "*.js" -not -path "./node_modules/*" -print0 | xargs -0 -n1 node --check');
