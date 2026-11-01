# Errubrikaren txostena

Aplikazioa berrikusi dut eta kodean marka jarri diot errubrikak betetzen dituen atal bakoitzari. Irudiaren ebaluazioa honako irizpide nagusi hauetara itzul daiteke:

- autentifikazioa eta rol-kontrola,
- datu-basearen iraunkortasuna eta eskema,
- kontsulta eta datu-karga,
- erabiltzaile eta inbentarioaren CRUD kudeaketa,
- interfaze bat ikustaldiak aldatzeko nabigazioarekin,
- hizkuntza anitzekoa, irisgarritasuna eta pribatutasuna.

Hemen dagoen eta kodean markatutako bakoitzak, errubrikako zati bat betetzen duela erakusten du. Hori azpimarratzeko, kontuan hartu beharreko ezaugarri nagusiak hauek dira: sarrerako saioa egokia, datuen biltegia egokia, erabiltzaileentzako eta inbentarioarentzako kudeaketa, interfazeko nabigazioa eta azkenik, erabiltzailearen pribatutasuna eta ikusmen-eginbidea.

## 1) Autentifikazioa, saioa eta rolaren arabera sarbide-kontrola

- [PHP/session.php](./PHP/session.php): 1-39 lerroak. `startAppSession()` eta `requireAppRole()` funtzioek saio segurua kudeatzen dute eta baimenik gabeko sarbideak blokeatzen dituzte. Honek esan nahi du web aplikazioa ez dela soilik interfazearen aurpegi bat, baizik eta segurtasun-geruza ere duela, erabiltzaile bakoitzaren rolaren arabera sarbidea mugatuz.
- [PHP/saioa.php](./PHP/saioa.php): 1-70 lerroak. Saio-hasiera egiaztatzen du, rola `$_SESSION`-en gordetzen du eta saio-ID berria sortzen du. Horrek esan nahi du saioa ez dela bakarrik “erabiltzailearen izena” gordetzea, baizik eta egiaztatutako perfilarekin loturiko pribatutasun-egoera mantentzea.
- [index.html](./index.html): 16-24 eta 47-64 lerroak. Saioa hasteko formularioa eta dashboardaren ikuspegi nagusia autentifikazioaren UX geruza osatzen dute. Hori ikusgarria da, erabiltzaileak sarrera-gela eta aplikazioaren barneko interfazea behar bezala bereizten dituelako.
- [JS/dashboard.js](./JS/dashboard.js): 1-8 eta 90-120 lerroak. Nabigazio logika eta ikuspegi-karga autentifikatutako erabiltzailearen rolaren arabera gertatzen da. Beraz, aplikazioak ez du “denek ikusten duten guztia” erakusten; erabiltzailearen profilaren arabera ikuspegiak aldatzen dira.

## 2) Datu-basea eta iraunkortasuna

- [kudeaketa_7.sql](./kudeaketa_7.sql): 1-53 lerroak. `rol`, `usuarios`, `inbentario` eta `parking` taulak definitzen dira, lehen gakoekin, erlazioekin eta murrizketekin. Honek datu-egituraren oinarria ezartzen du eta aplikazioak behar dituen informazio-bektore guztiak biltegiratzeko aukera ematen du.
- [kudeaketa_7.sql](./kudeaketa_7.sql): 55-118 lerroak. Datu inicialak sartzen dira eta erabiltzaileek eta rolak arteko erlazioa sortzen da. Hau garrantzitsua da, ez baita soilik eskema definitzea, baizik eta sistema martxan jartzeko testu-datuak eta loturak ere ezartzea.
- [kudeaketa_7.sql](./kudeaketa_7.sql): 120-170 lerroak. SQL ikuspegiak eta funtzioak definitzen dira parking eta inbentarioaren egoera kontsultatzeko. Horri esker, aplikazioa ez da datu basikoak erakustera mugatzen, baizik eta datu multzoak azkar eta eraginkortasunez berriro prozesatu daitezke.

## 3) Erabiltzaileen kontsulta eta datu-karga dinamikoa

- [PHP/select.php](./PHP/select.php): 1-96 lerroak. Endpoint-ak `SELECT` egiten du `usuarios` eta `rol` tauletan, JSON formatuan itzultzen du eta zutabeen existentzia balioztatzen du. Hau funtsezkoa da, aplikazioak aukera izateko datuak eskuratzea kontrolatu, formatu bateratuan eta arauak betetzen direnean.
- [PHP/select.php](./PHP/select.php): 55-83 lerroak. `users` eta `roles` erantzuna eraikitzen du, frontend-ek erabiltzeko prest. Hau datu-karga dinamikoa da: zerbitzariak JSON bat bidaltzen du, eta interfazea horri esker eraikitzen da.
- [JS/dashboard.js](./JS/dashboard.js): 1-40 eta 90-145 lerroak. Erabiltzaileen ikuspegia kargatzen du eta backend APIrekin integratzen da. Beraz, interfazea ez da estatikoa; datuak kontsultatzean errealitatean eguneratzen da.

## 4) Erabiltzaile eta inbentarioaren CRUDa eta datuen balidazioa

- [PHP/manage.php](./PHP/manage.php): 1-44 lerroak. Kudeaketa API definitzen da balidazioarekin eta JSON erantzun bateratuarekin. Honek datuen kudeaketa era antolatuan egiteko aukera ematen du, eta ez da “datuak zuzenean idaztea” besterik.
- [PHP/manage.php](./PHP/manage.php): 45-120 lerroak. `runManagementStatement()` eta zutabeen balidazioa egituren eta moten aurretik egiaztatzen dituzte, txertatu edo eguneratu aurretik. Honegatik, sarrerak ez dira hutsik onartzen; balioak kontrolatuta daude eta erroreak saihesten dira.
- [PHP/manage.php](./PHP/manage.php): 121-217 lerroak. `create`, `update` eta `delete` kudeatzen dira `usuarios` eta `inbentario` tauletan, eremuak eta baimenak egiaztatuz. Hori da aplikazioaren eragiketa nagusia: sortu, aldatu eta ezabatu, baina segurtasuna mantenduz.

## 5) Inbentarioa Excel-etik inportatzea

- [PHP/inventario-excel.php](./PHP/inventario-excel.php): 1-25 lerroak. JSON erantzuna prestatzen da eta Excel dokumentuaren irakurketa balioztatzen da. Honek esan nahi du sistema automatikoki arduratzen dela dokumentu elektronikoan dauden datuak interpretatzeaz.
- [PHP/inventario-excel.php](./PHP/inventario-excel.php): 26-120 lerroak. Liburuaren XMLa analizatzen da, gelaxkak irakurtzen dira eta testuak normalizatzen dira. Kode honek dena era egituratuan prozesatzen du, baita hainbat formatu edo karaktere berezietarako ere.
- [PHP/inventario-excel.php](./PHP/inventario-excel.php): 120-180 lerroak. Errenkadak `groups` egituran multzokatzen dira, goiburuak detektatzen dira eta `columns` + `groups` objektua itzultzen da frontend-erako. Honek ikuspegiaren kargatzea eta taulak sortzea erraztu egiten du.

## 6) Interfazea, rolaren arabera nabigazioa eta hizkuntza aniztasuna

- [index.html](./index.html): 16-24 eta 78-101 lerroak. Interfazea hizkuntzak, sail globala eta ikuspegien nabigazioa barne hartzen ditu. Honek erabiltzaileak aukera izan dezake hizkuntza aldatzeko eta aplikazioaren atalak modu ordenatuan kudeatzeko.
- [index.html](./index.html): 47-64 eta 90-101 lerroak. Saioa hasteko formularioa eta `overview`, `users` eta `inventory` ikuspegien nabigazioa agertzen dira interfaze nagusian. Hau errubrikako “nuevos puntos” nabarmenak dira: erabiltzaile bakoitzak bere bidea jasotzen du.
- [JS/dashboard.js](./JS/dashboard.js): 1-40 eta 120-160 lerroak. Dashboardaren ikuspegiak, kudeaketa inprimakiak eta datuen karga profilaren arabera hasieratzen dira. Horri esker, ez da beti berdin ikusten aplikazioa; rolak erabakitzen du zer ikusi.
- [JS/dashboard.js](./JS/dashboard.js): 250-330 lerroak (gutxi gorabehera). UIaren itzulpena EU/ES/EN hizkuntzetan `translations` objektuan ezartzen da. Honek errubrikako multilihazketa betetzen du, erabiltzaileak hizkuntza nahi duena hautatu ahal izateko.

## 7) Pribatutasuna eta interfaze pertsonalizatua

- [JS/theme.js](./JS/theme.js): 1-40 eta 44-90 lerroak. Gai argia/iluna aldatzen du eta hobespenak `localStorage`-en gordetzen ditu. Honek erabiltzailearen esperientzia pertsonalizatzen du eta interfazea estetika egokian mantentzen du.
- [JS/cookies.js](./JS/cookies.js): 1-25 eta 40-70 lerroak. Cookie teknikoa kudeatzen du alerta onartu ondoren ezkutatzeko, jarraipen-cookie gabe. Honek pribatutasun eta consentimendu printzipioak betetzen ditu, eta ez da jarraipen-analitika gaineratzen.

## 8) Betetzearen laburpena

Aplikazioa errubrikaren bloke nagusi guztietan betetzen du:

- autentifikazioa + rol-baimenak,
- MySQL modelo erlazionala,
- kontsultak eta JSON erabilera,
- balidatutako CRUDa,
- inbentarioa Excel-etik inportatzea,
- interfaz modernoa hizkuntza anitzekin,
- irisgarritasuna eta oinarrizko pribatutasuna erabiltzailearen esperientzian.

Beraz, errubrikaren arabera, proiektua oso ondo mugitzen da hainbat alorretan: segurtasuna, datuen kudeaketa, interfazearen ergonomia, bilketa eta dokumentu-interpretazioa. Gainera, egiaztapen hauek kode gakoetako fitxategietan ere markatuta daude, irakasleak atal bakoitza zuzenean kodean kokatu ahal izateko.
