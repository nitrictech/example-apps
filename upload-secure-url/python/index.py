# This file is used for local development
# it will start all processes in the functions directory as sub processes

import subprocess
import sys
import os
import glob

# Run all functions in project in parallel in separate python processes
processes = []
functions = glob.glob("functions/*.py")


def main():
    for func in functions:
        python_exec = "python"
        if os.environ.get("OS") == "Windows_NT":
            python_exec = f"{os.environ.get('VIRTUAL_ENV')}/Scripts/python.exe"
        p = subprocess.Popen([python_exec, func])
        processes.append((p))

    for p in processes:
        p.wait()


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
