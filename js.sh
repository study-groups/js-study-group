alias js-activate='js-nvm-start'

js-help(){
  cat <<EOF
Bash helper functions for developing javascript components.

js-activate: starts nvm for current node LTS version
EOF
}


js-nvm-install-help(){
  cat << EOF
1) curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

2) look in your .bashrc or .profile. The above adds:

  # This loads nvm
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  # This loads nvm bash_completion
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 

3) If you want to keep your profile clean, you can delete the above
   and use website-nvm-start (similar it pyenv's bin/activate)
EOF

}
js-nvm-start(){
  if [ -z "$js_ps1_orig" ]; then  # grab original first time and use it
    js_ps1_orig="$PS1"
  fi
  
  ver=${1:-"node"}
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && source "$NVM_DIR/bash_completion"
  nvm use $ver
  PS1="n:$js_ps1_orig"           # use original so multiple calls only one n 
}

js-nvm-install(){
  ver=${1:-"v0.39.1"}
  echo "Using nvm: $ver"
  echo "Find latest here  https://github.com/nvm-sh/nvm/releases"
  curl 'https://raw.githubusercontent.com/nvm-sh/nvm/$ver/install.sh' \
      | bash
  nvm install 'lts/*'
}

