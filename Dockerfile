# 使用官方的 Python 基础镜像
FROM python:3.9-slim

# 设置工作目录
WORKDIR /app

# 复制当前目录内容到容器内的 /app
COPY . /app

# 安装 Python 依赖
# 更新 pip 并使用国内源加速安装
RUN pip install --no-cache-dir -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/

# 暴露 Flask 的默认端口
EXPOSE 5000

# 定义容器启动时运行的命令
CMD ["python", "app.py"]
