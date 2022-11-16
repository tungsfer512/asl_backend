const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg()
    .input('../uploads/1668503329659_brother_02501_cut.mp4')
    .input('../uploads/1668503409968_family_02588_cut.mp4')
    .videoCodec('libx264')
    .complexFilter([
        '[0:v]scale=400:300[0scaled]',
        '[1:v]scale=400:300[1scaled]',
        '[0scaled]pad=800:300[0padded]',
        '[0padded][1scaled]overlay=shortest=1:x=400[output]',
        'amix=inputs=2' ///////// here
    ])
    .outputOptions(['-map [output]'])
    .output('./output.mp4')
    .on('error', function (er) {
        console.log('error occured: ' + er.message);
    })
    .on('end', function () {
        console.log('success');
    })
    .run();

// concatnate video using ffmpeg
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// const ffmpeg = require('fluent-ffmpeg');
// ffmpeg.setFfmpegPath(ffmpegPath);
// ffmpeg()
//     .input('../uploads/1668503329659_brother_02501_cut.mp4')
//     .input('../uploads/1668503409968_family_02588_cut.mp4')
//     .videoCodec('libx264')
//     .complexFilter([
//         '[0:v]scale=400:300[0scaled]',
//         '[1:v]scale=400:300[1scaled]',
//         '[0scaled]pad=800:300[0padded]',
//         '[0padded][1scaled]overlay=shortest=1:x=400[output]',
//         'amix=1:inputs=2',  ///////// here
//     ]).outputOptions(['-map [output]'])
//     .output('./output.mp4')
//     .on('error', function (er) {
//         console.log('error occured: ' + er.message);
//     }).on('end', function () {
//         console.log('success');
//     }).run();
//
