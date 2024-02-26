"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Avatar, Text, Group, Button, Grid } from '@mantine/core';
import { IconPhoneCall, IconAt, IconWorld, IconTrash, IconUserPlus, IconUserMinus, IconStar } from '@tabler/icons-react';
import classes from './page.module.css';
import styles from "./page.module.css";


export default function Cards() {
  const [users, setUsers] = useState([]);
  const [isFollowing, setIsFollowing] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleFollow = async (id) => {
    const userFollow = users.filter((data) => data.id == id);
    setUsers(userFollow);
    setIsFollowing(true);
  };

  const handleUnfollow = async (id) => {
    const userUnFollow = users.filter(data => data.id == id);
    setUsers(userUnFollow);
    setIsFollowing(false);
  };

  const handleCardDel = async (id) => {
    const delRecords = users.filter(record => record.id !== id);
    setUsers(delRecords);
    setSelectedIds([]);
  };

  return (
    <>
      <Grid m={20}>
        {users.map((user, i) => {
          return (
            <Card withBorder padding="xl" radius="md" className={classes.card} key={i}>
              <Avatar
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                size={80}
                radius={80}
                mx="auto"
                mt={-10}
                className={classes.avatar}
              />
              <Text ta="center" fz="lg" fw={500} mt="sm" mb={10}>
                {user.name}
                {/* <IconStar stroke={1.5} size="1.15rem" className={classes.icon} style={{ marginLeft: "5px" }} onClick={() => handleFollow(isFollowing.id)} /> */}
              </Text>
              <Group ta="left" fz="md" c="dimmed">
                <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                {user.email}
              </Group>
              <Group ta="left" fz="md" c="dimmed">
                <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
                {user.phone}
              </Group>
              <Group ta="left" fz="md" mb="sm" c="dimmed">
                <IconWorld stroke={1.5} size="1rem" className={classes.icon} />
                {user.website}
              </Group>
              <Group gap={5} className={classes.button}>
                <Group>
                  {isFollowing ? (<Button fullWidth radius="md" size="md" variant="btn btn-outline-primary" onClick={() => handleUnfollow(user.id)} >
                    <IconUserPlus stroke={2} size="1rem" className={classes.btn} />
                    Follow
                  </Button>) : (<Button fullWidth radius="md" size="md" variant="default" onClick={() => handleFollow(user.id)}>
                    <IconUserMinus stroke={2} size="1rem" className={classes.btn} />
                    unfollow
                  </Button>)}
                </Group>
                <Group>
                  <Button fullWidth radius="md" size="md" variant="outline" color='blue' onClick={() => handleCardDel(user.id)}>
                    <IconTrash stroke={2} size="1rem" className={classes.btn} />
                    Delete
                  </Button>
                </Group>
              </Group>
            </Card>
          )
        })}
      </Grid>
    </>
  )
}