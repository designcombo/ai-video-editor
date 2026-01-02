'use client';

import { useStudioStore } from '@/stores/studio-store';
import { AudioClip, Log } from '@designcombo/video';
import { useGeneratedStore } from '@/stores/generated-store';
import { IconWaveSine } from '@tabler/icons-react';
import { useState } from 'react';
import { AudioItem } from './audio-item';

export default function PanelSFX() {
  const { studio } = useStudioStore();
  const { sfx } = useGeneratedStore();
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleAddAudio = async (url: string) => {
    if (!studio) return;

    try {
      const audioClip = await AudioClip.fromUrl(url);
      await studio.addClip(audioClip, url);
    } catch (error) {
      Log.error('Failed to add audio:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto">
      {sfx.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[200px] gap-4">
             <IconWaveSine className="size-7 text-muted-foreground" stroke={1.5} />
            <div className="text-center text-muted-foreground text-sm">
            No SFX generated yet. Use the chat panel to generate sound effects!
            </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
            {sfx.map((item) => (
              <AudioItem
                key={item.id} 
                item={item} 
                onAdd={handleAddAudio}
                playingId={playingId}
                setPlayingId={setPlayingId}
              />
            ))}
        </div>
      )}
    </div>
  );
}
