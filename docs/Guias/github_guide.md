# Guía Completa de GitHub para Colaboración en Proyectos

## Introducción

GitHub es una plataforma que utiliza Git para el control de versiones y la colaboración en proyectos. A continuación, te proporciono una guía paso a paso para realizar las operaciones más comunes en GitHub.

## Configuración Básica de Git

Si aún no has configurado tu nombre de usuario y correo electrónico en Git, hazlo ejecutando estos comandos en tu terminal:
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com" 
```
## Crear una Rama
Las ramas permiten trabajar en características o correcciones sin afectar la rama principal (main o master). Para crear y cambiar a una nueva rama:
```bash
git checkout -b nombre-de-la-rama 
```
Explicación:

* `-b` indica que deseas crear una nueva rama.
* `nombre-de-la-rama` es el nombre de la nueva rama.

## Hacer Cambios en el Código

Realiza los cambios en los archivos de tu proyecto

### Agregar Cambios al Área de Staging

Una vez que hayas realizado cambios, debes agregarlos al área de staging antes de hacer un commit:
```bash
* git add nombre-del-archivo
```
  Para agregar todos los archivos modificados:
```
* git add .
```
  Explicación:
* `git add` prepara los archivos para el commit.

### Hacer un Commit
  Realiza un commit para guardar tus cambios en el repositorio local:
```
* git commit -m "Descripción de los cambios realizados"
```
  Explicación:
* `-m` permite incluir un mensaje para describir el commit.

### Actualizar tu Rama con Cambios del Repositorio Remoto

Antes de hacer un push, es buena idea asegurarte de que tu rama esté actualizada con la rama remota:
```
git fetch origin
```
  Esto descargará los cambios del repositorio remoto sin fusionarlos automáticamente en tu rama local.

  Para fusionar los cambios en tu rama:
```
git pull origin nombre-de-la-rama
```
  Explicación:
* `git fetch` descarga los cambios del repositorio remoto.
* `git pull` descarga y fusiona los cambios en tu rama local.
* 
## Subir tus Cambios al Repositorio Remoto

Después de hacer un commit, sube tus cambios al repositorio remoto en GitHub:
```
git push origin nombre-de-la-rama
```
  Explicación:
* `git push` envía tus commits al repositorio remoto.

Ve a tu repositorio remoto en la plataforma web y selecciona la opción para crear un pull request.

- Selecciona tu rama (nombre-de-tu-rama) como la fuente del pull request y la rama main (o la rama a la que deseas fusionar) como el destino.
- Escribe una descripción para tu pull request, detallando los cambios que has hecho.
- Envía el pull request para revisión.
- Espera que la revisión sea realizada.

### Fusionar Cambios a la Rama Principal(No recomendable sin supervisión)

Si quieres fusionar tu rama con la rama principal (main o master), primero cambia a la rama principal:
```
git checkout main
```
  A continuación, fusiona tu rama:
```
git merge nombre-de-la-rama
```
  Explicación:

* `git merge` integra los cambios de tu rama en la rama actual.

Puedes hacer los mismos pasos de la main a tu rama para tener las utlimas actualizaciones.

### Eliminar una Rama

Después de fusionar tu rama y asegurarte de que todo está correcto, puedes eliminar la rama local y remota si ya no la necesitas:
Eliminar la rama local:
```
git branch -d nombre-de-la-rama
```
  Eliminar la rama remota:
```
git push origin --delete nombre-de-la-rama
```
# Resumen de Comandos
- Clonar repositorio: git clone
- Crear y cambiar a una rama: git checkout -b
- Agregar cambios: git add o git add .
- Hacer un commit: git commit -m "mensaje"
- Actualizar desde el remoto: git fetch y git pull origin
- Subir cambios al remoto: git push origin
- Fusionar ramas: git merge
- Eliminar ramas: git branch -d (local) y git push origin --delete (remoto)