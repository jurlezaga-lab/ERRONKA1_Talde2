# FP Txurdinaga · Frontend

Interfaz en euskera, hecha con HTML, CSS, JavaScript nativo y PHP. Las pestañas **Usuarios** e **Inventario actual** consultan MySQL.

## Abrir

Configura la conexión en `PHP/db.konexioa.php` y asegúrate de que existe esa base de datos con la tabla `inbentario`. El endpoint admite tanto la estructura del proyecto como inventarios vinculados a una persona responsable. Después, desde la carpeta del proyecto, arranca el servidor PHP integrado:

```sh
php -S localhost:8000
```

Abre `http://localhost:8000`. No abras `index.html` directamente ni uses Live Server para esta función: la lista necesita ejecutar el endpoint PHP.

## Archivos

- `index.html`: portada y dashboard.
- `CSS/estilos.css`: diseño adaptable y temas claro/oscuro.
- `JS/dashboard.js`: navegación, autenticación de interfaz y carga de usuarios; la sesión se restaura desde el servidor cuando se recarga la página.
- `PHP/saioa.php` y `PHP/session.php`: inicio, consulta y cierre de sesión PHP y comprobación de permisos. La cookie contiene solo el identificador y la identidad se conserva en `$_SESSION`; el login actual sigue siendo de demostración y se valida en el servidor.
- `PHP/select.php`: endpoint de solo lectura que devuelve usuarios, roles y centros en JSON usando la conexión compartida de `PHP/db.konexioa.php`.
- `PHP/inbentarioa.php`: endpoint de solo lectura que devuelve el inventario MySQL en JSON, tanto si los artículos están asociados a un centro como si tienen una persona responsable.
- `PHP/manage.php`: endpoint protegido para que los administradores creen, editen y borren usuarios y artículos del inventario.
- `JS/theme.js`: cambio de tema persistido en el navegador.
- `IMG/Logotipo_Txurdinaga.png`: logotipo usado por la interfaz.

La vista de inventario incluye **Inventario actual**, cargado de `inbentario`, con opciones de gestión para administradores; **Componentes PC · Excel**, una vista del contenido de `Especificaciones_PC_Hardware-v2.xlsx` con acceso al archivo original; y **Presupuesto futuro**, una planificación de demostración sin conexión a la base de datos. La planificación usa 10.000 €, estima 8.900 € en necesidades futuras (1.500 € de prioridad baja, 3.000 € media y 4.400 € alta) y deja 1.100 € de reserva. No representa gastos reales. Los administradores también pueden crear, editar y borrar usuarios desde la lista. Los registros de acceso y los datos del parking siguen siendo de demostración y se guardan en `localStorage` de ese navegador.

## Acceso por rol

- `admin` y `gugul`: pueden acceder a **Orokorra**, **Erabiltzaileak** e **Inbentarioa**.
- `ikasle` e `irakasle`: solo acceden a **Orokorra**.
- `inventario`: solo accede a **Inbentarioa**.

La interfaz limita las vistas y los endpoints PHP también comprueban la sesión y el rol antes de devolver usuarios o inventario.

La cuenta `gugul` (`67`) intenta iniciar sesión en PHP cuando se usa el servidor local, de modo que **Inventario actual** consulta los registros reales de MySQL. En el despliegue estático de Vercel, donde no hay PHP ni MySQL, usa una sesión temporal en `sessionStorage` y datos de ejemplo para Usuarios e Inventario. Esa alternativa es exclusivamente una demostración, no una autenticación segura: las credenciales y los datos están en el JavaScript público y cualquier visitante puede inspeccionarlos o cambiar el estado del navegador. Las demás cuentas necesitan el backend PHP.