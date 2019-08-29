<?php

require_once('connect.php');

if ((isset($_GET['cmd'])) && $_GET['cmd'] != 0) {
    $cmd = $_GET['cmd'] * 1;
}

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);
}

switch ($cmd) {

    case 1:

        $produkte = [];
        $sql = "SELECT Art, Groesse, Preis, Einkaufspreis FROM produkte";

        if ($result = mysqli_query($con, $sql)) {
            $cr = 0;
            while ($row = mysqli_fetch_assoc($result)) {
                $produkte[$cr]['Art']     = $row['Art'];
                $produkte[$cr]['Groesse'] = $row['Groesse'];
                $produkte[$cr]['Preis']   = $row['Preis'];
                $produkte[$cr]['Einkaufspreis']   = $row['Einkaufspreis'];
                $cr++;
            }
            echo json_encode(['data' => $produkte]);
        } else {
            http_response_code(404);
        }
        break;

    case 2:

        $res = [];

        $produktName = mysqli_real_escape_string($con, $request->data->Art);
        $size = mysqli_real_escape_string($con, $request->data->Groesse);

        $stmt = $con->prepare(
            "SELECT Sum(Menge) as Menge from produktebestellung WHERE ProdukteID = (SELECT produkteID from produkte WHERE Art = ? and Groesse = ?)"
        );

        $stmt->bind_param("ss", $produktName, $size);
        $result = $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($menge);

        $cr = 0;
        while ($stmt->fetch()) {
            $res[$cr]['Art']        = $produktName;
            $res[$cr]['Groesse']    = $size;
            $res[$cr]['Menge']      = $menge;
            $cr++;
        }


        echo json_encode(['data' => $res]);
        break;

    case 3:
        // prepare sql and bind parameters
        $stmt = $conPDO->prepare("DELETE MyGuests (firstname, lastname, email)
            VALUES (:firstname, :lastname, :email)");
        $stmt->bindParam(
            ':firstname',
            $firstname,
        );
        break;

    case 4:
        // echo json_encode($request->data->Art);
        $Art = mysqli_real_escape_string($con, $request->data->Art);
        $Groesse = mysqli_real_escape_string($con, $request->data->Groesse);
        $Preis = mysqli_real_escape_string($con, $request->data->Preis);

        // prepare sql and bind parameters
        $stmt = $conPDO->prepare("DELETE from produkte where Art = :Art and Groesse = :Groesse and Preis = :Preis");
        $stmt->execute(array(
            ':Art' => $Art,
            ':Groesse' => $Groesse,
            ':Preis' => $Preis,
        ));

        echo json_encode(array('data' => ""));
        break;

    case 5:
        // echo json_encode($request->data->Art);
        $Art = mysqli_real_escape_string($con, $request->data->Art);
        $Groesse = mysqli_real_escape_string($con, $request->data->Groesse);
        $Preis = mysqli_real_escape_string($con, $request->data->Preis);
        $Einkaufspreis = mysqli_real_escape_string($con, $request->data->Einkaufspreis);


        // prepare sql and bind parameters
        $stmt = $conPDO->prepare("INSERT INTO produkte (Art, Groesse, Preis, Einkaufspreis) values (:Art, :Groesse, :Preis, :Einkaufspreis)");
        $stmt->execute(array(
            ':Art' => $Art,
            ':Groesse' => $Groesse,
            ':Preis' => $Preis,
            ':Einkaufspreis' => $Einkaufspreis,
        ));

        echo json_encode(array('data' => ""));
        break;

    case 6:
        $BestellungsPreis = mysqli_real_escape_string($con, $request->data->Bestellungspreis);
        $GutscheinWert = mysqli_real_escape_string($con, $request->data->Gutscheinwert);
        $GutscheinNummer = mysqli_real_escape_string($con, $request->data->Gutscheinnummer);
        $GeldErhalten = mysqli_real_escape_string($con, $request->data->Gelderhalten);
        $TrinkGeld = mysqli_real_escape_string($con, $request->data->Trinkgeld);
        $Rueckgeld = mysqli_real_escape_string($con, $request->data->Rueckgeld);
        $Nutzer = mysqli_real_escape_string($con, $request->data->Nutzer);

        // prepare sql and bind parameters
        $stmt = $conPDO->prepare("INSERT INTO bestellungen (BestellungsPreis, GutscheinWert, GutscheinNummer, GeldErhalten, TrinkGeld, Rueckgeld, Nutzer) values (:BestellungsPreis, :GutscheinWert, :GutscheinNummer, :GeldErhalten, :TrinkGeld, :Rueckgeld, :Nutzer)");
        $stmt->execute(array(
            ':BestellungsPreis'     => $BestellungsPreis,
            ':GutscheinWert'        => $GutscheinWert,
            ':GutscheinNummer'      => $GutscheinNummer,
            ':GeldErhalten'         => $GeldErhalten,
            ':TrinkGeld'            => $TrinkGeld,
            ':Rueckgeld'            => $Rueckgeld,
            ':Nutzer'               => $Nutzer,
        ));

        echo json_encode(array('data' => ""));
        break;

    case 7:
        $BestellungsPreis = mysqli_real_escape_string($con, $request->data->Bestellungspreis);
        $GutscheinWert = mysqli_real_escape_string($con, $request->data->Gutscheinwert);
        $GutscheinNummer = mysqli_real_escape_string($con, $request->data->Gutscheinnummer);
        $GeldErhalten = mysqli_real_escape_string($con, $request->data->Gelderhalten);
        $TrinkGeld = mysqli_real_escape_string($con, $request->data->Trinkgeld);
        $Rueckgeld = mysqli_real_escape_string($con, $request->data->Rueckgeld);
        $Nutzer = mysqli_real_escape_string($con, $request->data->Nutzer);

        // prepare sql and bind parameters
        $stmt = $conPDO->prepare("SELECT MAX(BestellungsID) FROM bestellungen");
        $stmt->execute();

        $result = $stmt->fetchAll();

        echo json_encode(array('data' => $result));
        break;

    case 8:
        $Art = mysqli_real_escape_string($con, $request->data->Art);
        $Groesse = mysqli_real_escape_string($con, $request->data->Groesse);
        $Preis = mysqli_real_escape_string($con, $request->data->Preis);


        // prepare sql and bind parameters
        $stmt = $conPDO->prepare("SELECT produkteID from produkte where Art = :Art and Groesse = :Groesse and Preis = :Preis");
        $stmt->execute(array(
            ':Art' => $Art,
            ':Groesse' => $Groesse,
            ':Preis' => $Preis,
        ));

        echo json_encode(array('data' => $stmt->fetch()));
        break;

    case 9:
        $BestellungsID = mysqli_real_escape_string($con, $request->data->BestellungsID);
        $ProdukteID = mysqli_real_escape_string($con, $request->data->ProdukteID);
        $Menge = mysqli_real_escape_string($con, $request->data->Menge);


        // prepare sql and bind parameters
        $stmt = $conPDO->prepare("INSERT INTO produktebestellung (BestellungsID, ProdukteID, Menge) values (:BestellungsID, :ProdukteID, :Menge)");
        $stmt->execute(array(
            ':BestellungsID' => $BestellungsID,
            ':ProdukteID' => $ProdukteID,
            ':Menge' => $Menge,
        ));

        echo json_encode(array('data' => ""));
        break;
}
