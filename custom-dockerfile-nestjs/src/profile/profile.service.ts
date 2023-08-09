import { Injectable, NotFoundException } from '@nestjs/common';
import { collection } from '@nitric/sdk';
import { v4 as uuidv4 } from 'uuid';

export interface Profile {
  id: string;
  name: string;
  age: number;
}

const profiles = collection<Profile>('profiles').for(
  'reading',
  'writing',
  'deleting',
);

@Injectable()
export class ProfileService {
  async getProfile(id: string): Promise<Profile> {
    const profile = await profiles.doc(id).get();

    if (!profile) {
      throw new NotFoundException();
    }

    return profile;
  }

  async getProfiles(): Promise<Profile[]> {
    const profileDocuments = await profiles.query().fetch();

    return profileDocuments.documents.map((d) => d.content);
  }

  async createProfile(createProfileReq: Omit<Profile, 'id'>): Promise<Profile> {
    const id: string = uuidv4();

    const profile = { id, ...createProfileReq } as Profile;

    await profiles.doc(id).set(profile);

    return profile;
  }

  async deleteProfile(id: string): Promise<void> {
    await profiles.doc(id).delete();
  }
}
