import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Notification } from "../database/entities/Notification";

const getUserNotifications = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = req.currentUser?.id;
  try {
    const notificationRepository = AppDataSource.getRepository(Notification);
    const notifications = await notificationRepository.find({
      where: { user: { id: userId } },
      order: { date: "DESC" },
    });
    return res.status(200).json({ message: "Notifications", notifications });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const markNotificationAsRead = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { notificationId } = req.params;
  try {
    const notificationRepository = AppDataSource.getRepository(Notification);
    const notification = await notificationRepository.update(notificationId, {
      is_read: true,
    });

    return res.status(200).json({ message: "Notification marked as read!" });
  } catch (error) {
    console.log(`Error mark_notification: ${error}`);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export { getUserNotifications, markNotificationAsRead };
