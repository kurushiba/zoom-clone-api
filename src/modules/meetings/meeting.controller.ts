import { Router } from 'express';
import { Auth } from '../../lib/auth';
import { Meeting } from './meeting.entity';
import datasource from '../../datasource';

const meetingController = Router();
const meetingRepository = datasource.getRepository(Meeting);

meetingController.post('/', Auth, async (req, res) => {
  try {
    const meeting = await meetingRepository.save({});
    res.json({ meetingId: meeting.id });
  } catch (error) {
    console.error('create meeting error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

meetingController.post('/join/:meetingId', Auth, async (req, res) => {
  try {
    const { meetingId } = req.params;

    // ミーティングをIDで検索
    const meeting = await meetingRepository.findOne({
      where: { id: meetingId },
    });

    // ミーティングが存在しない場合
    if (!meeting) {
      return res.status(404).json({ message: 'ミーティングが見つかりません' });
    }

    // アクティブなミーティングの場合、IDを返す
    res.json({ meetingId: meeting.id });
  } catch (error) {
    console.error('join meeting error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default meetingController;
