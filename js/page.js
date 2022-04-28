import swal from 'sweetalert2';

const deviceWidth = window.innerWidth;
if(deviceWidth > 1200) {
    const navItems = Array.from(document.querySelectorAll('.nav-wrapper a'));
    // console.log( navItems );
    navItems.forEach(el => {
        if(el.href === window.location.href) {
            el.classList.add('active');
        }
    });
}
if(!window.location.host.includes('localhost') && !window.location.host.includes('blog.abschill')) {
    let path = window.location.pathname;
    if(path === '/') path = '';
    swal.mixin({
        toast: true,
        showConfirmButton: true
    }).fire('Domain Change', '<p>This domain has changed to blog.abschill.com, you will be redirected</p>', 'info')
    .then(_ => window.location.replace('https://blog.abschill.com' + path));
}
