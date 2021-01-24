<?php

require './util.php';
require './object/Booking.php';

// Parse input json
$raw = file_get_contents('php://input');
$body = json_decode($raw, true);
$token = $body["token"];
//$mode =

if (strlen($token) == 0) {
    resErr("Missing token");
    exit();
}

$user = getUserByToken($token);
if (!oauth($user)) {
    resErr("Unauthorized");
    exit();
}

// Validate input
$roomId = $body["room_id"];
$start = $body["start"];
$end = $body["end"];
$goal = $body["goal"];
$today = date("Y-m-d");

if ($roomId <= 0) {
    resErr("Invalid room_id");
    exit();
}

if ($start <= 0) {
    resErr("Invalid start time");
    exit();
}

if ($start >= $end) {
    resErr("Invalid start time & end time");
    exit();
}

if ($start > 39 || $end > 39 || $start < 0 || $end < 0) {
    resErr("Invalid start time or end time");
    exit();
}

if ($end <= 0) {
    resErr("Invalid end time");
    exit();
}

if (strlen($goal) == 0) {
    resErr("Missing goal");
    exit();
}

// Validate available (room exist, book time available)
$room = getRoomById($roomId);
if (count($room) == 0) {
    resErr("Invalid room_id");
    exit();
}

$bookings = getBookings($roomId, $today);

$check = [];
for ($i = 0; $i <= 48; $i++) {
    $check[$i] = true;
}

//var_dump($bookings);

foreach ($bookings as $bk) {
    $s = $bk->getStart();
    $e = $bk->getEnd();

    for ($i = $s; $i <= $e; $i++) {
        $check[$i] = false;
    }
}

$countDup = 0;
for ($i = $start + 1; $i < $end; $i++) {
    if ($check[$i] == false) {
        resErr(sprintf("Booking invalid"));
        exit();
    }
}


// Create booking
$booking = new Booking();
$booking->setRoomId($body["room_id"]);
$booking->setDate($today);
$booking->setStart($body["start"]);
$booking->setEnd($body["end"]);
$booking->setGoal($body["goal"]);
$booking->setUserId($user->getId());

createBooking($booking);

echo json_encode([
    "success" => true,
]);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: application/json');

function createBooking($booking)
{
    try {
        $conn = getPDOConnection();
        $query = "INSERT INTO booking
                    (room_id,
                    user_id,
                    start,
                    end,
                    date,
                    goal)
                    VALUES
                    (:room_id,
                     :user_id,
                     :start,
                     :end,
                     :date,
                     :goal)";
        $stmt = $conn->prepare($query);
        $result = $stmt->execute([
            ":room_id" => $booking->getRoomId(),
            ":user_id" => $booking->getUserId(),
            ":start" => $booking->getStart(),
            ":end" => $booking->getEnd(),
            ":date" => $booking->getDate(),
            ":goal" => $booking->getGoal(),
        ]);

        if ($result) {
            return $conn->lastInsertId();
        } else {
            return -1;
        }

        closeConnection($conn);
        return $result;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function getRoomById($id)
{
    try {
        $conn = getPDOConnection();
        $query = "SELECT 
                         id
                    FROM room
                    WHERE id = :id";


        $stmt = $conn->prepare($query);
        $stmt->execute([
            ":id" => $id
        ]);

        $data = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $data[$row['id']] = [
                "id" => $row["id"]
            ];
        }

        closeConnection($conn);
        return $data;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}

function getBookings($roomId, $date)
{
    try {
        $conn = getPDOConnection();
        $query = "SELECT 
                         id, room_id, user_id, start, end, date, goal
                    FROM booking
                    WHERE room_id = :room_id
                    and date = :date";


        $stmt = $conn->prepare($query);
        $stmt->execute([
            ":room_id" => $roomId,
            ":date" => $date
        ]);

        $data = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

            $item = new Booking();
            $item->setId($row["id"]);
            $item->setUserId($row["user_id"]);
            $item->setRoomId($row["room_id"]);
            $item->setStart($row["start"]);
            $item->setDate($row["date"]);
            $item->setEnd($row["end"]);
            $item->setGoal($row["goal"]);

            $data[] = $item;
        }

        closeConnection($conn);
        return $data;
    } catch (Exception $exc) {
        print_r($exc);
        return false;
    }
}