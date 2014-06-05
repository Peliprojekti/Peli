Peli
====
Jenkins CI: [ohtu.jamo.io/job/Peliprojekti](http://ohtu.jamo.io/job/Peliprojekti/)

Asennus
-------
Aennusta varten tarvitaan node.js, sekä siihen kuuluva npm. Tarvittavat node.js moduulit saa aseenettua ajamalla komento **npm install** kansiossa *Peli/Pelilogiikka/src/main/nodejs*.

Käynnistys
----------
Kunhan node.js ja moduulit on asennettu saa serverin päälle ajamalla komenon **npm start** samaisessa **../main/nodejs kansiossa**. Pelin näyttö löytyy tämän jälkeen osoitteesta [localhost:8080/screen](http://localhost:8080/screen) ja ohjaimet osoitteest [localhost:8080](http://localhost:8080) (localhostin voi access pointtia käytettäessä korvata IP osoitteella).

Peliin ensimmäisenä aukeava näyttö on testialusta jota ei ole tarkoitettu lopulliseen pelin pyörittämiseen. Viemällä hiiren näytön yläreunaan saadaan valikko auki josta oikealla voi vaihtaa testialustan asetuksia, mukaanlukien käytössä olevaa kontrolleri tyyppiä. Keskellä valikko löytyy linkkejä toisiin "peleihin", jotka tällä hetkellä koostuvat pelimoottorin testialustasta sekä integroidusta pelimoottorista johon saa myös ohjaimella yhteyden.
