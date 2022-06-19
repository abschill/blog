const { watch } = require('fs');

watch('web/styles/css/style.css', (ev, f) => {
	!(() => require('./compile-postcss'))();
});
