# -*- encoding: utf-8 -*-

from setuptools import setup, find_packages

requires = [
    'Flask',
    'flask-sqlalchemy',
    'flask-restful',
    'paramiko',
    'passlib'
]

setup(
    name='vpnchooser',
    version='0.5.0',
    description='',
    classifiers=[
        "Programming Language :: Python",
    ],
    author='',
    author_email='',
    url='',
    keywords='',
    packages=find_packages('src'),  # include all packages under src
    package_dir={'': 'src'},  # tell distutils packages are under src
    namespace_packages=[],
    include_package_data=True,
    zip_safe=False,
    install_requires=requires,
    entry_points="""\
      """,
)
