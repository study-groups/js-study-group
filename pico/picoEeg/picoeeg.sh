#!/bin/bash

STK_SRC=$HOME/src/vendor/stk-4.6.2
PICOEEG_SRC=$HOME/src/js-study-group/pico/picoEeg

picoeeg_help(){
  cat <<EOF
  picoeeg_requirements_{mac,linux}
  picoeeg_install_sdk
  picoeeg_setup
  picoeeg_build
  picoeeg_run
  picoeeg_clean
EOF
}

picoeeg_install_stk(){
  (
    cd ~/src/vendor
    wget http://ccrma.stanford.edu/software/stk/release/stk-4.6.2.tar.gz
    tar xvzf stk-4.6.2.tar.gz
    cd stk-4.6.2
    ./configure --host=aarch64-apple-darwin --build=aarch64-apple-darwin \
    CC=/usr/bin/clang CXX=/usr/bin/clang++ \
    -g \
    CFLAGS="-target arm64-apple-macos11" CXXFLAGS="-target arm64-apple-macos11" LDFLAGS="-g -target arm64-apple-macos11"
    make
  )
}

picoeeg_requirements_mac(){
  brew install gcc
  brew install meson
  brew install ninja
  brew install ncurses
  brew install pkg-config
}

picoeeg_requirements_linux(){
    sudo bash <<EOF
    apt install -y libncurses5-dev libncursesw5-dev
    apt install -y meson
    apt install -y libasound2-dev
    apt install -y cmake
EOF
}

picoeeg_setup(){
  rm -rf build
  meson setup build \
    -Dstk_src=$STK_SRC \
    -Dbuild_info="$(date)"
}

picoeeg_build(){
  ninja -C build
}

picoeeg_clean(){
  rm -rf build
}

picoeeg_run(){
  ./build/PicoEeg
}

picoeeg_build_mvc(){
  g++ -std=c++11 -o mvc ./mvc.cpp -lncurses
}
