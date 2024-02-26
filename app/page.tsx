"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Avatar, Text, Group, Button, Grid } from "@mantine/core";
import {
  IconPhoneCall,
  IconAt,
  IconWorld,
  IconTrash,
  IconUserPlus,
  IconUserMinus,
  IconStar,
} from "@tabler/icons-react";
import classes from "./page.module.css";

export default function Cards() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res: any) => {
        const response = res.data.map((item: any) => {
          item["isFollow"] = false;
          return item;
        });
        setUsers(response);
      })
      .catch((error: any) => console.log(error));
  }, []);

  const handleFollow = async (id: number) => {
    const output = users.map((item) => {
      if (item.id === id) {
        return { ...item, ["isFollow"]: !item["isFollow"] };
      }
      return item;
    });
    setUsers(output);
  };

  const handleCardDel = async (id: number) => {
    const delRecords = users.filter((record) => record.id !== id);
    setUsers(delRecords);
  };

  return (
    <Grid m={20}>
      {users.map((user, i) => {
        return (
          <Card
            withBorder
            padding="xl"
            radius="md"
            className={classes.card}
            key={i}
          >
            <Avatar
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              size={80}
              radius={80}
              mx="auto"
              mt={-10}
              className={classes.avatar}
            />
            <Text ta="center" fz="lg" fw={500} mt="sm" mb={10}>
              <span>{user.name}</span>
              {user.isFollow ? (
                <IconStar
                  stroke={1.5}
                  size="1.15rem"
                  className={classes.icon}
                  style={{ marginLeft: "5px" }}
                />
              ) : null}
            </Text>
            <Group ta="left" fz="md" c="dimmed">
              <IconAt stroke={1.5} size="1rem" className={classes.icon} />
              {user.email}
            </Group>
            <Group ta="left" fz="md" c="dimmed">
              <IconPhoneCall
                stroke={1.5}
                size="1rem"
                className={classes.icon}
              />
              {user.phone}
            </Group>
            <Group ta="left" fz="md" mb="sm" c="dimmed">
              <IconWorld stroke={1.5} size="1rem" className={classes.icon} />
              {user.website}
            </Group>
            <Group gap={4} className={classes.button}>
              <Group>
                <Button
                  fullWidth
                  radius="md"
                  size="md"
                  variant={
                    user.isFollow ? "default" : "btn btn-outline-primary"
                  }
                  onClick={() => handleFollow(user.id)}
                >
                  <div>
                    {user.isFollow ? (
                      <IconUserMinus
                        stroke={2}
                        size="1rem"
                        className={classes.btn}
                      />
                    ) : (
                      <IconUserPlus
                        stroke={2}
                        size="1rem"
                        className={classes.btn}
                      />
                    )}
                  </div>
                  <span>{user?.isFollow ? "UnFollow" : "Follow"}</span>
                </Button>
              </Group>
              <Group>
                <Button
                  fullWidth
                  radius="md"
                  size="md"
                  variant="outline"
                  color="blue"
                  onClick={() => handleCardDel(user.id)}
                >
                  <IconTrash stroke={2} size="1rem" className={classes.btn} />
                  Delete
                </Button>
              </Group>
            </Group>
          </Card>
        );
      })}
    </Grid>
  );
}
