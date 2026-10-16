# FP Txurdinaga · Frontend

Interfaz en euskera, hecha con HTML, CSS, JavaScript nativo y PHP. Las pestañas **Usuarios** e **Inventario actual** consultan MySQL.

## Abrir

Configura la conexión en `PHP/db.konexioa.php` y asegúrate de que existe la base de datos `kudeaketa_db` con las tablas de `SQL/kudeaketa_2_estruktura.sql`. Después, desde la carpeta del proyecto, arranca el servidor PHP integrado:

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
- `PHP/inbentarioa.php`: endpoint de solo lectura para el inventario y los centros en JSON.
- `JS/theme.js`: cambio de tema persistido en el navegador.
- `IMG/Logotipo_Txurdinaga.png`: logotipo usado por la interfaz.

La vista de inventario incluye **Inventario actual**, cargado de `inbentario`; **Componentes PC · Excel**, una vista del contenido de `Especificaciones_PC_Hardware-v2.xlsx` con acceso al archivo original; y **Presupuesto futuro**, una planificación de demostración sin conexión a la base de datos. La planificación usa 10.000 €, estima 8.900 € en necesidades futuras (1.500 € de prioridad baja, 3.000 € media y 4.400 € alta) y deja 1.100 € de reserva. No representa gastos reales. Los usuarios también se consultan desde la base de datos. Los registros de acceso y los datos del parking siguen siendo de demostración y se guardan en `localStorage` de ese navegador.

## Acceso por rol

- `admin`: puede acceder a **Orokorra**, **Erabiltzaileak** e **Inbentarioa**.
- `ikasle` e `irakasle`: solo acceden a **Orokorra**.
- `inventario`: solo accede a **Inbentarioa**.

La interfaz limita las vistas y los endpoints PHP también comprueban la sesión y el rol antes de devolver usuarios o inventario.