
console.log('Use: find . -name "*.js" -not -path "./node_modules/*" -print0 | xargs -0 -n1 node --check');
