FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Shanghai


RUN  sed -i "s@http://.*archive.ubuntu.com@http://repo.huaweicloud.com@g" /etc/apt/sources.list \
     && sed -i "s@http://.*security.ubuntu.com@http://repo.huaweicloud.com@g" /etc/apt/sources.list \
     && apt update \
     && apt install -y curl wget git vim zsh nginx\
     && apt autoclean \
     && apt autoremove

# oh-my-zsh
RUN wget https://gitee.com/mirrors/oh-my-zsh/raw/master/tools/install.sh \
    && sed -i s@REPO=\${REPO:-ohmyzsh/ohmyzsh}@REPO=\${REPO:-mirrors/oh-my-zsh}@ \install.sh \
    && sed -i s@REMOTE=\${REMOTE:-https://github.com/\${REPO}.git}@REMOTE=\${REMOTE:-https://gitee.com/\${REPO}.git}@ \install.sh \
    && chmod +x install.sh \
    && ./install.sh -y
