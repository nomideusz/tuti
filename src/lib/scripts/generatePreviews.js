import { sqip } from 'sqip';
import { resolve, join, dirname } from 'path';
import { posix as path } from 'path';
import sqipPluginPrimitive from 'sqip-plugin-primitive';
const ORIGINALS_DIR = path.join('src', 'lib', 'images', 'originals', '*.*');
const PREVIEWS_DIR = path.join('src', 'lib', 'images', 'previews');

console.log("Start");

async function generateSQIPPreview() {
  try {
    const pluginResults = await sqip({
        input: ORIGINALS_DIR,
        output: PREVIEWS_DIR,
        plugins: [
            {
                name: 'sqip-plugin-primitive',
                options: {
                    numberOfPrimitives: 30,
                    mode: 1,
                    rep: 1
                },
            },
            'sqip-plugin-svgo',
        ],
    });
    console.log("End");
    return pluginResults;
  } catch (err) {
    console.log('Błąd podczas generowania podglądów SQIP');
    console.error(err);
    throw err;
  }
}

generateSQIPPreview();

export default generateSQIPPreview;
