export ZSH="/home/stranger/.oh-my-zsh"
ZSH_THEME="robbyrussell"
plugins=()
source $ZSH/oh-my-zsh.sh

# Load some info for the user
cd ~
echo -e "\033[0;92m➜\033[0m  \033[96m~\033[0m echo -e \$(cat contact.txt)"
echo -e $(cat contact.txt)
echo -e "\033[0;92m➜\033[0m  \033[96m~\033[0m echo -e \$(cat work.txt)"
echo -e $(cat work.txt)