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
        $sql = "SELECT Art, Groesse, Preis FROM produkte";

        if ($result = mysqli_query($con, $sql)) {
            $cr = 0;
            while ($row = mysqli_fetch_assoc($result)) {
                $produkte[$cr]['Art']     = $row['Art'];
                $produkte[$cr]['Groesse'] = $row['Groesse'];
                $produkte[$cr]['Preis']   = $row['Preis'];
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

        $stmt = $con->prepare(
            "SELECT Sum(Menge) as Menge from produktebestellung WHERE ProdukteID = (SELECT produkteID from produkte WHERE Art = ?)"
        );

        $stmt->bind_param("s", $produktName);
        $result = $stmt->execute();

        /* bind result variables */
        $stmt->bind_result($menge);

        $cr = 0;
        while ($stmt->fetch()) {
            $res[$cr]['Art']        = $produktName;
            $res[$cr]['Menge']      = $menge;
            $cr++;
        }

        echo json_encode(['data' => $res]);

        // $res = [];

        // $productArray = $request->data;

        // for ($i = 0; $i < sizeOf($productArray); $i++){

        //     $produktName = $productArray[$i]->Art;

        //     $stmt = $con->prepare(
        //         "SELECT Sum(Menge) as Menge from produktebestellung WHERE ProdukteID = (SELECT produkteID from produkte WHERE Art = ?)"
        //     );

        //     $stmt->bind_param("s", $produktName);
        //     $result = $stmt->execute();

        //     /* bind result variables */
        //     $stmt->bind_result($menge);


        //     while ($stmt->fetch()) {
        //         $res[$i]['Art']        = $produktName;
        //         $res[$i]['Menge']      = $menge;

        //     }

        // }

        // echo json_encode(['data' => $res]);


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
}
 