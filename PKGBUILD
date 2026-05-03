# Maintainer: Natalie <natalie@localhost>
pkgname=messenger-pwa-tauri
pkgver=1.0.0
pkgrel=1
pkgdesc="Facebook Messenger Tauri/WebKitGTK Wrapper with Chrome UA spoof for video calling"
arch=('x86_64')
url="https://github.com/spivanatalie64/Messenger-pwa"
license=('ISC')
depends=('libwebkit2gtk-4.1' 'gtk3' 'glib2' 'cairo' 'pango' 'gdk-pixbuf2' 'libsoup3')
makedepends=('rust' 'cargo' 'nodejs' 'npm')
source=("git+https://github.com/spivanatalie64/Messenger-pwa-tauri.git"
        "messenger-pwa-tauri.desktop"
        "messenger-pwa-tauri.sh")
sha256sums=('SKIP'
            'SKIP'
            'SKIP')

build() {
  cd "$srcdir/Messenger-pwa-tauri/src-tauri"
  cargo build --release --locked
}

package() {
  install -Dm755 "$srcdir/Messenger-pwa-tauri/src-tauri/target/release/messenger-pwa-tauri" \
    "$pkgdir/opt/$pkgname/messenger-pwa-tauri"
  
  install -Dm755 "$srcdir/messenger-pwa-tauri.sh" \
    "$pkgdir/usr/bin/$pkgname"
  
  install -Dm644 "$srcdir/messenger-pwa-tauri.desktop" \
    "$pkgdir/usr/share/applications/$pkgname.desktop"
  
  install -Dm644 "$srcdir/Messenger-pwa-tauri/src-tauri/icons/icon.png" \
    "$pkgdir/usr/share/pixmaps/$pkgname.png"
}