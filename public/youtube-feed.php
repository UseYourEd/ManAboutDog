<?php
// youtube-feed.php
// Fetches the latest videos from the ManAboutDog YouTube channel RSS feed
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: public, max-age=900"); // Cache for 15 minutes

$channelId = "UC-ugJ2URGIm_I6IY-SR1z1g";
$feedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=" . $channelId;

$ch = curl_init($feedUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 8);
curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (compatible; ManAboutDogSite/1.0)");
$xmlString = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($xmlString === false || $httpCode !== 200) {
    http_response_code(502);
    echo json_encode(["error" => "Unable to fetch YouTube RSS feed"]);
    exit();
}

$xml = @simplexml_load_string($xmlString);
if ($xml === false) {
    http_response_code(500);
    echo json_encode(["error" => "Unable to parse YouTube RSS feed"]);
    exit();
}

$videos = [];
$namespaces = $xml->getNamespaces(true);

foreach ($xml->entry as $entry) {
    $yt = $entry->children($namespaces['yt'] ?? 'http://www.youtube.com/xml/schemas/2015');
    $videoId = (string)$yt->videoId;
    $title = (string)$entry->title;
    $published = (string)$entry->published;
    $link = "";
    foreach ($entry->link as $l) {
        $attrs = $l->attributes();
        if (isset($attrs['href'])) {
            $link = (string)$attrs['href'];
            break;
        }
    }

    if ($videoId) {
        $videos[] = [
            "id" => $videoId,
            "title" => html_entity_decode($title, ENT_QUOTES | ENT_XML1, 'UTF-8'),
            "published" => $published,
            "link" => $link ?: ("https://www.youtube.com/watch?v=" . $videoId),
            "thumbnail" => "https://i.ytimg.com/vi/" . $videoId . "/hqdefault.jpg"
        ];
    }

    if (count($videos) >= 6) {
        break;
    }
}

echo json_encode(["videos" => $videos]);
?>
